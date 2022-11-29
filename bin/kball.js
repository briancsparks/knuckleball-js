
const { getGetVpcs } = require('../lib/aws/ec2');
const { inspect } = require('../lib/utils');

(async function() {
  await main();
})().catch(console.dir);

async function main() {

  const getVpcs = getGetVpcs();
  console.log(inspect(await getVpcs()));

  console.log('booya');
}


