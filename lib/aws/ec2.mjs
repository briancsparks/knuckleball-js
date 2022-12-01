
import {EC2}                from '@aws-sdk/client-ec2';
import { unAwsIfy }         from './aws-utils.mjs';
import { straightenTags }   from './tags.mjs';
// import { inspect } from '../utils.mjs';
import deepmerge from "deepmerge";

const region = process.env.AWS_REGION || 'us-east-1';
const ec2 = new EC2({region});

// --------------------------------------------------------------------------------------------------------------------
// Other Ids:
// DhcpOptionsId
// VpcId
// OwnerId
// CidrBlockAssociationSet[] .AssociationId

export function getGetVpcs(args0 ={}) {
  assureEc2Client();

  return async function getVpcs(args1= {}) {
    const args = deepmerge(args0, args1);

    let origVpcs = await ec2.describeVpcs(args);

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

// --------------------------------------------------------------------------------------------------------------------
// Other Ids:
// DhcpOptionsId
// VpcId
// OwnerId
// CidrBlockAssociationSet[] .AssociationId

// --------------------------------------------------------------------------------------------------------------------
// also: OwnerId, VpcId

export function getGetSecurityGroups(args0 ={}) {
  assureEc2Client();

  return async function getSecurityGroups(args1= {}) {
    const args = deepmerge(args0, args1);

    let origSecurityGroups = await ec2.describeSecurityGroups(args);
    // console.log(origSecurityGroups);

    let SecurityGroups   = [];
    let securityGroups   = {};
    for (const securityGroup_ of origSecurityGroups.SecurityGroups) {
      const tags = straightenTags(securityGroup_.Tags || []);
      const securityGroup = {...securityGroup_, tags};
      securityGroups[securityGroup.GroupId] = securityGroup;
      SecurityGroups.push(securityGroup);
    }

    return {securityGroups, SecurityGroups};
  }
}

// --------------------------------------------------------------------------------------------------------------------

// Other Ids:
//  VpcId
//  OwnerId
export function getGetSubnets(args0 ={}) {
  assureEc2Client();

  return async function getSubnets(args1= {}) {
    return unAwsIfy(await ec2.describeSubnets(deepmerge(args0, args1)), 'Subnet');
  }
}

// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId
export function getGetRouteTables(args0 ={}) {
  assureEc2Client();

  return async function getRouteTables(args1= {}) {
    return unAwsIfy(await ec2.describeRouteTables(deepmerge(args0, args1)), 'RouteTable');
  }
}

// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId
export function getGetInternetGateways(args0 ={}) {
  assureEc2Client();

  return async function getInternetGateways(args1= {}) {
    return unAwsIfy(await ec2.describeInternetGateways(deepmerge(args0, args1)), 'InternetGateway');
  }
}

// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId
export function getGetDhcpOptions(args0 ={}) {
  assureEc2Client();

  return async function getDhcpOptions(args1= {}) {
    const items = await ec2.describeDhcpOptions(deepmerge(args0, args1));
    return unAwsIfy(items, 'DhcpOptions', 'DhcpOptionsId');
  }
}

// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId
export function getGetAddresses(args0 ={}) {
  assureEc2Client();

  return async function getAddresses(args1= {}) {
    const items = await ec2.describeAddresses(deepmerge(args0, args1));
    return unAwsIfy(items, 'Addresses', 'AssociationId');
  }
}

// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId
export function getGetKeyPairs(args0 ={}) {
  assureEc2Client();

  return async function getKeyPairs(args1= {}) {
    const items = await ec2.describeKeyPairs(deepmerge(args0, args1));
    return unAwsIfy(items, 'KeyPair');
  }
}

// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId
export function getGetVolumes(args0 ={}) {
  assureEc2Client();

  return async function getVolumes(args1= {}) {
    const items = await ec2.describeVolumes(deepmerge(args0, args1));
    return unAwsIfy(items, 'Volume');
  }
}

// --------------------------------------------------------------------------------------------------------------------
// also: VpcId, OwnerId, SubnetId, ImageId, KernelId, RamdiskId, NetworkInterfaceId, SpotInstanceRequestId, CapacityReservationId
// BlockDeviceMappings[] .Ebs.VolumeId
// NetworkInterfaces[] .Attachment.AttachmentId
// NetworkInterfaces[] .SubnetId
// NetworkInterfaces[] .VpcId
// Groups[] .GroupId
// SecurityGroups[] .GroupId

export function getGetInstances(args0 ={}) {
  assureEc2Client();

  return async function getInstances(args1= {}) {
    const items = await ec2.describeInstances(deepmerge(args0, args1));

    let   Instances = [];
    for (const reservation of items.Reservations) {
      for (const instance of reservation.Instances) {
        Instances.push(instance)
      }
    }
    return unAwsIfy({Instances}, 'Instance');
  }
}

// // --------------------------------------------------------------------------------------------------------------------
// function unAwsIfy(items, shortName_, idKey_ =null) {
//   const plural = idKey_ ? shortName_ : `${shortName_}s`;
//   const idKey  = idKey_ || `${shortName_}Id`;
//
//   let awsArr   = [];
//   let data   = {};
//   for (const item_ of items[plural]) {
//     const tags = straightenTags(item_.Tags || []);
//     const item = {...item_, tags};
//     data[item[idKey]] = item;
//     awsArr.push(item);
//   }
//
//   return {[plural]: awsArr, [plural.toLowerCase()]: data};
// }

// --------------------------------------------------------------------------------------------------------------------

function assureEc2Client() {
  // const  Client = require( "@aws-sdk/client-ec2");
  // Client.DescribeVpcsCommand()
  // ec2 = new Client.EC2({region});
  // return ec2;
}
