SDK_VERSION := $(shell grep 'sdk-version' daml.yaml | cut -d ' ' -f 2)
MODELS_DAR=target/bond-issuance.dar
TRIGGERS_DAR=target/bond-issuance-triggers.dar
FINLIB_DAR=target/finlib-master-sdk-$(SDK_VERSION).dar
JS_CODEGEN_DIR=ui/daml.js

.PHONY: build
build: build-dars yarn-install-deps

.PHONY: clean
clean:
	rm -rf .daml triggers/.daml
	rm -rf ui/node_modules ui/build $(JS_CODEGEN_DIR)
	rm -rf target

### DARS ###

.PHONY: build-dars
build-dars: $(MODELS_DAR) $(TRIGGERS_DAR)

DAML_SRC=$(shell find src/ -name '*.daml')

$(FINLIB_DAR):
	scripts/getfinlib.py $(SDK_VERSION)

$(MODELS_DAR): $(DAML_SRC) daml.yaml $(FINLIB_DAR)
	daml build --output $@

TRIGGERS_DAML_SRC=$(shell find triggers/src/ -name '*.daml')

$(TRIGGERS_DAR): $(TRIGGERS_DAML_SRC) triggers/daml.yaml $(MODELS_DAR)
	cd triggers && daml build --output ../$@


### JS Codegen ###

JS_CODEGEN_ARTIFACT=$(JS_CODEGEN_DIR)/bond-issuance-2.0.0/package.json

$(JS_CODEGEN_ARTIFACT): $(MODELS_DAR) $(FINLIB_DAR)
	daml codegen js -o $(JS_CODEGEN_DIR) $^


### UI Install ###

UI_INSTALL_ARTIFACT=ui/node_modules

$(UI_INSTALL_ARTIFACT): ui/package.json ui/yarn.lock $(JS_CODEGEN_ARTIFACT)
	cd ui && yarn install --force --frozen-lockfile

.PHONY: yarn-install-deps
yarn-install-deps: $(UI_INSTALL_ARTIFACT)

.PHONY: package
package: yarn-install-deps
	cd ui && yarn build && mkdir -p ../target && zip -r ../target/bondui.zip build/
