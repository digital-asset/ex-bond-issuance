version := 0.1
colon   := :

SDK_VERSION := $(shell grep 'sdk-version' daml.yaml | cut -d ' ' -f 2)

.PHONY: build
build:
	python scripts/getfinlib.py $(SDK_VERSION)
	daml build -o target/bond-issuance.dar
	cd triggers && daml build -o ../target/bond-issuance-triggers.dar

.PHONY: clean
clean:
	rm -rf target
	yarn cache clean
	rm -rf daml.js
	rm -rf ui/build
	rm -rf ui/node_modules/
	rm -rf .daml

.PHONY: installui
installui:
	daml codegen js target/*.dar -o daml.js
	cd ui && yarn install

.PHONY: ui
ui: installui

.PHONY: packui
packui: installui
	cd ui && yarn build && mkdir -p ../target && zip -r ../target/bondui.zip build/
