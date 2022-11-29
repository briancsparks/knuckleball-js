#!/usr/bin/env node

import {
  getGetSecurityGroups,
  getGetRouteTables,
  getGetDhcpOptions,
  getGetInternetGateways,
  getGetAddresses,
  getGetKeyPairs,
  getGetVolumes,
  getGetInstances
} from '../lib/aws/ec2.mjs';

import {
  getGetFunctions,
  getGetLayers,
  getGetLayerVersions
} from '../lib/aws/lambda.mjs';
import { inspect } from '../lib/utils.mjs';

(async function() {
  await main();
})().catch(console.dir);

async function main() {
  let aws;
  let layers;

  // const getVpcs     = getGetVpcs();
  // console.log(inspect(await getVpcs()));

  // const getSecurityGroups     = getGetSecurityGroups();
  // console.log(inspect(await getSecurityGroups()));

  // const getSubnets  = getGetSubnets();
  // console.log(inspect(await getSubnets()));

  // const getRouteTables  = getGetRouteTables();
  // console.log(inspect(await getRouteTables()));

  // let   aws = getGetInternetGateways();
  // console.log(inspect(await aws()));

  // aws       = getGetDhcpOptions();
  // console.log(inspect(await aws()));

  // aws       = getGetAddresses();
  // console.log(inspect(await aws()));

  // aws       = getGetKeyPairs();
  // console.log(inspect(await aws()));

  // aws       = getGetVolumes();
  // console.log(inspect(await aws()));

  // aws       = getGetInstances();
  // console.log(inspect(await aws()));

  // aws       = getGetFunctions();
  // console.log(inspect(await aws()));

  aws       = getGetLayers();
  layers    = await aws();
  console.log(inspect(layers));

  // layers.Layers[0].LayerName
  aws       = getGetLayerVersions();
  const LayerName = layers.Layers[0].LayerName;
  console.log(inspect(await aws({LayerName})));

  // console.log('booya');
}


