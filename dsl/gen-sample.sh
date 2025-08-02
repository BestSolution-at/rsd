npm run langium:generate \
 && npm run build

node ./bin/cli.js model examples/simple/simple-sample.rsd -d examples/generated
node ./bin/cli.js artifacts examples/simple/simple-sample.rsd -c examples/simple/.rsd-generator.json
