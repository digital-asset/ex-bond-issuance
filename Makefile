version := 0.1
colon   := :

.PHONY: trigger
trigger:
	# example
	daml trigger --dar .daml/dist/bond-issuance-2.0.0.dar --trigger-name Triggers.NewsTrigger$(colon)flagTheOrderTrigger --ledger-host localhost --ledger-port 6865 --ledger-party LogicProvider --wall-clock-time

.PHONY: build
build:
	mvn clean package

.PHONY: clean
clean:
	yarn cache clean
	rm -rf daml2ts
	rm -rf ui/build

buildui: clean
	daml codegen ts -o daml2ts -p package.json target/*.dar
	yarn workspaces run build
	cd ui-js && yarn install

.PHONY: ui
ui: buildui
	cd ui-js && yarn start

.PHONY: start
start:
	daml start --sandbox-option --address=localhost --sandbox-option -w --start-navigator=no

.PHONY: automation
automation:
	java -jar target/bond-issuance-0.0.1-SNAPSHOT.jar

.PHONY: docker
docker: buildui
	docker-compose up --build
