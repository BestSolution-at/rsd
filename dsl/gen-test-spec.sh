npm run langium:generate \
 && npm run build

node ./bin/cli.js model ./test/test-specs/sample.rsd -d ./test/test-specs
node ./bin/cli.js artifacts ./test/test-specs/sample.rsd -c ./test/test-specs/.rsd-generator.json
