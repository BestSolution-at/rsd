npm run langium:generate \
 && npm run build

node ./packages/cli/bin/cli.js model ./examples/simple/simple-sample.rsd -d ./examples/simple/generated
node ./packages/cli/bin/cli.js artifacts ./examples/simple/simple-sample.rsd -c ./examples/simple/.rsd-generator.json
