
import {EC2}                from '@aws-sdk/client-ec2';
import { unAwsIfy }         from './aws-utils.mjs';
import { straightenTags }   from './tags.mjs';
import { inspect }          from '../utils.mjs';
import deepmerge            from "deepmerge";
import {Lambda}             from '@aws-sdk/client-lambda';

const region = process.env.AWS_REGION || 'us-east-1';
const ec2 = new EC2({region});
const lambda  = new Lambda({region: process.env.AWS_REGION || 'us-east-1'});


// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId
export function getGetFunctions(args0 ={}) {
  // assureEc2Client();

  return async function getFunctions(args1= {}) {
    const items = await lambda.listFunctions(deepmerge(args0, args1));
    return unAwsIfy(items, 'Functions', 'FunctionName');
  }
}

// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId
export function getGetLayers(args0 ={}) {
  // assureEc2Client();

  return async function getLayers(args1= {}) {
    const items = await lambda.listLayers(deepmerge(args0, args1));
    return unAwsIfy(items, 'Layers', 'LayerName');
  }
}

// --------------------------------------------------------------------------------------------------------------------
export function getGetLayerVersions(args0 ={}) {
  // assureEc2Client();

  return async function getLayerVersions(args1= {}) {
    const items = await lambda.listLayerVersions(deepmerge(args0, args1));
    return unAwsIfyLayerVersions(items, 'LayerVersions');
  }
}
// --------------------------------------------------------------------------------------------------------------------
export function unAwsIfyLayerVersions(items, shortName_, idKey_ =null) {
  const plural = idKey_ ? shortName_ : `${shortName_}s`;
  const idKey  = idKey_ || `${shortName_}Id`;

  let awsArr   = [];
  let data   = {};
  for (const item_ of items.LayerVersions) {
    const tags = straightenTags(item_.Tags || []);
    const Id =  item_.LayerVersionArn.split(':').slice(-2).join(':');
    const item = {...item_, tags};
    data[Id] = item;
    awsArr.push(item);
  }

  return {[plural]: awsArr, [plural.toLowerCase()]: data};
}


// values0.codeSigningConfigs = lambda.listCodeSigningConfigs({});
// values0.eventSourceMappings = lambda.listEventSourceMappings({});
// values1.functionEventInvokeConfigs =  lambda.listFunctionEventInvokeConfigs({FunctionName: fn.FunctionName});
// values1.functionUrlConfigs =  lambda.listFunctionUrlConfigs({FunctionName: fn.FunctionName});
// values1.provisionedConcurrencyConfigs =  lambda.listProvisionedConcurrencyConfigs({FunctionName: fn.FunctionName});
// values1.versionsByFunction =  lambda.listVersionsByFunction({FunctionName: fn.FunctionName});
// values1.aliases = lambda.listAliases({FunctionName: fn.FunctionName});


// // --------------------------------------------------------------------------------------------------------------------
// export function getGetLayers(args0 ={}) {
//   // assureEc2Client();
//
//   return async function getLayers(args1= {}) {
//     const items = await lambda.listLayers(deepmerge(args0, args1));
//     return unAwsIfy(items, 'Layer');
//   }
// }

