npm run langium:generate \
 && npm run build

node ./packages/cli/bin/cli.js model ../../qutime/spec/quti.rsd -d ../../qutime/spec/
node ./packages/cli/bin/cli.js ../../qutime/spec/quti.rsd -c ../../qutime/spec/.rsd-generator.json
