S3CMD ?= s3cmd
S3_FLAGS ?= --acl-public --delete-removed --no-progress --no-mime-magic --guess-mime-type
INTERMEDIATE_STEPS ?= echo nothing
DIST_CLEAN = rm -rf dist

runserver: $(JS_SENTINAL)
	-cp src/images/* dist/images/.
	npm run serve

build: $(JS_SENTINAL)
	npm run build
	cp src/images/* dist/images/.

dev: $(JS_SENTINAL)
	npm run dev 

eslint: $(JS_SENTINAL)
	npm run eslint

test: $(JS_SENTINAL) eslint
	npm run test
	npm run cypress:test

cypress:
	npm run cypress:open

watch-test: $(JS_SENTINAL)
	npm run watch-test

snapshot: $(JS_SENTINAL)
	npm run snapshot

deploy-stage: $(JS_SENTINAL) 
	$(DIST_CLEAN) \
	&& npm run stage \
	&& mkdir -p dist/images && cp src/images/* dist/images/. \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(STAGING_BUCKET)/

deploy-prod: $(JS_SENTINAL) 
	$(DIST_CLEAN) \
	&& npm run prod \
	&& mkdir -p dist/images && cp src/images/* dist/images/. \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(PROD_BUCKET)/

.PHONY: runserver build dev eslint test deploy-stage deploy-prod cypress
