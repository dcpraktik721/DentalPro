PYTHON ?= python3
NPM ?= npm

.PHONY: init check tree clean artifacts excel

init:
	$(PYTHON) -m pip install -r requirements.txt
	$(NPM) install

check:
	$(PYTHON) -c "from pathlib import Path; required=['README.md','docs','artifacts','scripts','registry','config','data/raw','data/normalized','data/exports','excel']; missing=[p for p in required if not Path(p).exists()]; (__import__('sys').exit(f'Missing required paths: {missing}') if missing else print('Workspace structure check passed'))"
	$(NPM) run lint:paths

tree:
	find . -maxdepth 3 | sort

clean:
	find logs -type f \\( -name '*.tmp' -o -name '*.log' \\) -delete
	find artifacts -type d -name 'tmp' -prune -exec rm -rf {} +

artifacts:
	mkdir -p artifacts data/raw data/normalized data/exports logs

excel:
	mkdir -p excel
