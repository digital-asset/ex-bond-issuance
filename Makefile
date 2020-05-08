version := 0.1
colon   := :

.PHONY: build
build:
	daml build -o target/bond-issuance.dar

.PHONY: clean
clean:
	yarn cache clean
	rm -rf daml2js
	rm -rf ui/build

buildui: clean
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
