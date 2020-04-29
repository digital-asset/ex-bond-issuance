version := 0.1
colon   := :

.PHONY: trigger
trigger:
	#cd ui-js && yarn start
	daml trigger --dar .daml/dist/bond-issuance-2.0.0.dar --trigger-name Triggers.NewsTrigger$(colon)flagTheOrderTrigger --ledger-host localhost --ledger-port 6865 --ledger-party LogicProvider --wall-clock-time

.PHONY: package
package:
	rm -f deploy/daml.yaml
	rm -rf deploy/daml
	rm -rf deploy/ui
	mkdir -p deploy/ui/public
	cp -R ui-js/build/* deploy/ui/public
	cp ui-js/server/server.js deploy/ui/
	cp -R daml deploy/
	cp daml.yaml deploy/

.PHONY: clean
clean:
	yarn cache clean
	rm -rf daml2ts
	rm -rf ui/build

build: clean
	daml build
	daml codegen ts -o daml2ts -p package.json target/finlib*.dar
	yarn workspaces run build
	daml codegen ts -o daml2ts -p package.json .daml/dist/*.dar
	yarn workspaces run build
	yarn install

.PHONY: ui
ui: build
	cd ui-js && yarn start

start:
	daml start --start-navigator='no'