

import {EC2}   from '@aws-sdk/client-ec2';
import { straightenTags }   from './tags.mjs';
import { inspect } from '../utils.mjs';

const region = process.env.AWS_REGION || 'us-east-1';
const ec2 = new EC2({region: process.env.AWS_REGION || 'us-east-1'});

(async function() {
  const {vpcs, Vpcs} = (await (getGetVpcs())());
  console.log(inspect({vpcs, Vpcs}))
})();

export function getGetVpcs() {
  assureEc2Client();
  // console.log({ec2})

  return async function getVpcs() {
    let origVpcs = await ec2.describeVpcs({});

    let Vpcs   = [];
    let vpcs   = {};
    for (const vpc_ of origVpcs.Vpcs) {
      const tags = straightenTags(vpc_.Tags || []);
      const vpc = {...vpc_, tags};
      vpcs[vpc.VpcId] = vpc;
      Vpcs.push(vpc);
    }

    return {vpcs, Vpcs};
  }
}

function assureEc2Client() {
  // const  Client = require( "@aws-sdk/client-ec2");
  // Client.DescribeVpcsCommand()
  // ec2 = new Client.EC2({region});
  // return ec2;
}
