#!/usr/bin/env python3
"""Normalize the RPT_50 'Информация о карте' field conservatively.

Rule:
1. Take the main text from the most relevant row cell.
2. Add a useful detail-link label only if it does not duplicate the main text.
3. Add a short descriptor from a detail page/panel only if it is stable and useful.
4. Join only confirmed fragments with ' | '.

Guardrails:
- Do not include guessed content.
- Do not include long noisy text.
- Do not include medical interpretation fragments such as 'Диагноз:'.
- If reliable extraction fails, return an empty value and
  CARD_INFO_NOT_RELIABLY_EXTRACTED warning.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, asdict
from html import unescape
from typing import List, Optional


MAX_FRAGMENT_LENGTH = 160
WARNING_CODE = "CARD_INFO_NOT_RELIABLY_EXTRACTED"


def _normalize_whitespace(value: str) -> str:
    value = unescape(value or "")
    value = re.sub(r"<[^>]+>", " ", value)
    value = value.replace("\xa0", " ")
    value = re.sub(r"[ \t]+", " ", value)
    value = re.sub(r"\s*\n\s*", "\n", value)
    return value.strip()


def _line_is_allowed(line: str) -> bool:
    stripped = line.strip()
    if not stripped:
        return False
    lowered = stripped.lower()
    if lowered.startswith("диагноз:"):
        return False
    return True


def _split_primary_fragments(primary_text: str) -> List[str]:
    lines = [_normalize_whitespace(part) for part in (primary_text or "").splitlines()]
    lines = [line for line in lines if _line_is_allowed(line)]
    return lines[:2]


def _extract_from_info_cell_html(info_cell_html: Optional[str]) -> List[str]:
    if not info_cell_html:
        return []

    fragments: List[str] = []
    patterns = [
        r'<div[^>]*class="[^"]*text-muted[^"]*"[^>]*>(.*?)</div>',
        r'<span[^>]*class="[^"]*text-primary[^"]*"[^>]*>(.*?)</span>',
    ]
    for pattern in patterns:
        match = re.search(pattern, info_cell_html, flags=re.S | re.I)
        if not match:
            continue
        text = _normalize_whitespace(match.group(1))
        if _line_is_allowed(text):
            fragments.append(text)
    return fragments[:2]


def _is_useful_fragment(fragment: Optional[str]) -> bool:
    if not fragment:
        return False
    fragment = _normalize_whitespace(fragment)
    if not fragment:
        return False
    if len(fragment) > MAX_FRAGMENT_LENGTH:
        return False
    if fragment in {"Редактировать", "Подробнее", "Открыть"}:
        return False
    return True


def _dedupe_keep_order(items: List[str]) -> List[str]:
    seen = set()
    result: List[str] = []
    for item in items:
        normalized = item.casefold()
        if normalized in seen:
            continue
        seen.add(normalized)
        result.append(item)
    return result


@dataclass
class CardInfoResult:
    value: str
    warnings: List[str]
    components: List[str]


def build_card_info(
    *,
    primary_text: str,
    info_cell_html: Optional[str] = None,
    detail_link_label: Optional[str] = None,
    detail_descriptor: Optional[str] = None,
    status_text: Optional[str] = None,
) -> CardInfoResult:
    components: List[str] = []

    html_fragments = _extract_from_info_cell_html(info_cell_html)
    if html_fragments:
        components.extend(html_fragments)
    else:
        components.extend(_split_primary_fragments(primary_text))

    detail_label = _normalize_whitespace(detail_link_label or "")
    if _is_useful_fragment(detail_label):
        components.append(detail_label)

    descriptor = _normalize_whitespace(detail_descriptor or "")
    if _is_useful_fragment(descriptor):
        components.append(descriptor)

    # Add the short empty-state descriptor only when nothing better was found.
    status = _normalize_whitespace(status_text or "")
    if not components and status in {"Пустая", "Подтверждена"}:
        components.append(status)

    components = [item for item in components if _is_useful_fragment(item)]
    components = _dedupe_keep_order(components)

    value = " | ".join(components)
    warnings: List[str] = []
    if not value:
        warnings.append(WARNING_CODE)
    return CardInfoResult(value=value, warnings=warnings, components=components)


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(
        description="Normalize an RPT_50 card-info payload from JSON input."
    )
    parser.add_argument("--primary-text", required=True)
    parser.add_argument("--info-cell-html")
    parser.add_argument("--detail-link-label")
    parser.add_argument("--detail-descriptor")
    parser.add_argument("--status-text")
    args = parser.parse_args()

    result = build_card_info(
        primary_text=args.primary_text,
        info_cell_html=args.info_cell_html,
        detail_link_label=args.detail_link_label,
        detail_descriptor=args.detail_descriptor,
        status_text=args.status_text,
    )
    print(json.dumps(asdict(result), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
