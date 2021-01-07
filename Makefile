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
	rm -rf ui-js/build
	rm -rf ui-js/node_modules/
	rm -rf .daml

.PHONY: buildui
buildui:
	daml codegen js target/*.dar -o daml.js
	cd ui-js && yarn install

.PHONY: ui
ui: buildui
	cd ui-js && yarn start

.PHONY: start
start:
	daml start --sandbox-option --address=localhost --sandbox-option -w --open-browser no

.PHONY: automation
automation:
	JAVA_TOOL_OPTIONS=-Xmx128m \
	scripts/waitForSandbox.sh localhost 6865 && \
  scripts/startTriggers.sh localhost 6865 target/bond-issuance-triggers.dar

.PHONY: docker
docker: buildui
	docker-compose up --build
