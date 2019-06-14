S3CMD ?= s3cmd S3_FLAGS ?= --acl-public --delete-removed --no-progress --no-mime-magic --guess-mime-type INTERMEDIATE_STEPS ?= echo nothing

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

watch-test: $(JS_SENTINAL)
	npm run watch-test

snapshot: $(JS_SENTINAL)
	npm run snapshot

deploy-stage: $(JS_SENTINAL) 
	npm run stage \
	&& cp src/images/* dist/images/. \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(STAGING_BUCKET)/

deploy-prod: $(JS_SENTINAL) 
	npm run prod \
	&& cp src/images/* dist/images/. \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(PROD_BUCKET)/

.PHONY: runserver build dev eslint test deploy-stage deploy-prod
