npm run langium:generate \
 && npm run build

node ./bin/cli.js model ../../qutime/spec/quti.rsd -d ../../qutime/spec/
node ./bin/cli.js artifacts ../../qutime/spec/quti.rsd -c ../../qutime/spec/.rsd-generator.json