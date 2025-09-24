npm run langium:generate \
 && npm run build

node ./packages/cli/bin/cli.js model ./packages/cli/test/test-specs/sample.rsd -d ./packages/cli/test/test-specs
node ./packages/cli/bin/cli.js artifacts ./packages/cli/test/test-specs/sample.rsd -c ./packages/cli/test/test-specs/.rsd-generator.json
