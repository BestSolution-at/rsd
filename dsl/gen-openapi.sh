#!/bin/sh

docker run --rm \
-v $PWD:/local openapitools/openapi-generator-cli generate \
-i /local/packages/cli/test/test-specs/gen-out/openapi/openapi.json \
-g typescript-fetch --additional-properties=importFileExtension=.js,allowUnicodeIdentifiers=true,modelPropertyNaming=original \
-o /local/packages/cli/test/test-specs/gen-out/client/typescript-client-openapi/src
