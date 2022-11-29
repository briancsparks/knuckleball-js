
import { straightenTags }   from './tags.mjs';

// --------------------------------------------------------------------------------------------------------------------
export function unAwsIfy(items, shortName_, idKey_ =null) {
  const plural = idKey_ ? shortName_ : `${shortName_}s`;
  const idKey  = idKey_ || `${shortName_}Id`;

  let awsArr   = [];
  let data   = {};
  for (const item_ of items[plural]) {
    const tags = straightenTags(item_.Tags || []);
    const item = {...item_, tags};
    data[item[idKey]] = item;
    awsArr.push(item);
  }

  return {[plural]: awsArr, [plural.toLowerCase()]: data};
}

