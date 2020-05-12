version := 0.1
colon   := :

SDK_VERSION := $(shell grep 'sdk-version' daml.yaml | cut -d ' ' -f 2)

.PHONY: build
build:
	python scripts/getfinlib.py $(SDK_VERSION)
	daml build -o target/bond-issuance.dar

.PHONY: clean
clean:
	rm -rf target
	yarn cache clean
	rm -rf daml2js
	rm -rf ui/build

buildui:
	daml codegen js target/*.dar -o daml2js
	cd ui-js && yarn install

.PHONY: ui
ui: buildui
	cd ui-js && yarn start

.PHONY: start
start:
	daml start --sandbox-option --address=localhost --sandbox-option -w --start-navigator=no

.PHONY: automation
automation:
	JAVA_TOOL_OPTIONS=-Xmx128m \
	scripts/waitForSandbox.sh localhost 6865 && \
  scripts/startTriggers.sh localhost 6865 target/bond-issuance.dar

.PHONY: docker
docker: buildui
	docker-compose up --build
