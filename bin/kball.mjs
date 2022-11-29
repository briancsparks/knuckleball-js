#!/usr/bin/env node

// import { $ } from 'zx';
//
// await $`ls`


import { getGetVpcs } from '../lib/aws/ec2.mjs';
import { inspect } from '../lib/utils.mjs';

(async function() {
  await main();
})().catch(console.dir);

async function main() {

  const getVpcs = getGetVpcs();
  console.log(inspect(await getVpcs()));

  console.log('booya');
}


