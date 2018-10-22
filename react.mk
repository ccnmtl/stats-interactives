S3CMD ?= s3cmd
S3_FLAGS ?= --acl-public --delete-removed --no-progress --no-mime-magic --guess-mime-type
INTERMEDIATE_STEPS ?= echo nothing

runserver: $(JS_SENTINAL)
	npm run serve

build: $(JS_SENTINAL)
	npm run build

dev: $(JS_SENTINAL)
	npm run dev 

eslint: $(JS_SENTINAL)
	#npm run eslint
	echo "Stub for eslint"

test: $(JS_SENTINAL) eslint
	#npm run test
	echo "Stub for tests"

deploy-stage: $(JS_SENTINAL) 
	npm run stage \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(STAGING_BUCKET)/

deploy-prod: $(JS_SENTINAL) 
	npm run prod \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(PROD_BUCKET)/

.PHONY: runserver build dev eslint test deploy-stage deploy-prod
