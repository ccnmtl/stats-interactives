STAGING_URL=https://stats-interactives.stage.ccnmtl.columbia.edu/
PROD_URL=https://stats-interactives.ctl.columbia.edu/
STAGING_BUCKET=stats-interactives.stage.ctl.columbia.edu
PROD_BUCKET=stats-interactives.ctl.columbia.edu
INTERMEDIATE_STEPS ?= echo nothing
NODE_MODULES ?= ./node_modules
DIST ?= dist
JS_SENTINAL ?= $(NODE_MODULES)/sentinal

include *.mk

$(JS_SENTINAL): package.json
	rm -rf $(NODE_MODULES)
	npm install
	touch $(JS_SENTINAL)

clean:
	rm -rf $(NODE_MODULES) $(DIST) 

.PHONY: clean
