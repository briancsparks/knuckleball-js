#!/usr/bin/env node


import { getGetSecurityGroups, getGetRouteTables, getGetVpcs, getGetSubnets } from './ec2.mjs';
import { inspect } from '../utils.mjs';

(async function() {
  await main();
})().catch(console.dir);

async function main() {

  const getVpcs = getGetVpcs();
  console.log(inspect(await getVpcs()));

  const getSecurityGroups = getGetSecurityGroups();
  console.log(inspect(await getSecurityGroups()));

  const getSubnets = getGetSubnets();
  console.log(inspect(await getSubnets()));

  const getRouteTables = getGetRouteTables();
  console.log(inspect(await getRouteTables()));

  // console.log('booya');
}


