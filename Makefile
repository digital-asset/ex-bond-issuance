version := 0.1
colon   := :

.PHONY: build
build:
	mvn clean package

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
	java -jar target/bond-issuance-0.0.1-SNAPSHOT.jar

.PHONY: docker
docker: buildui
	docker-compose up --build