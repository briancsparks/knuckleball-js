
// module.exports.straightenTags = straightenTags;

export function straightenTags(Tags) {
  let tags = {};

  for (let {Key, Value=null} of Tags) {
    Value = Value || Key;
    tags = {...tags, [Key]: Value};
  }

  return tags;
}
