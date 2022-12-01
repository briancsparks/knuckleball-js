
import n_util from 'util';
// const n_util = require('util');
//
// module.exports.inspect = inspect;

// if (require.main === module) {
//   console.log(inspect({x:{y:{z:{a:42}, g:"booya"}}}))
// }

export function inspect(x) {
  return  n_util.inspect(x, false, null, true);
}


/** -------------------------------------------------------------------------------------------------------------------
 *
 * @param obj
 * @returns {Promise<{}>}
 */
export async function awaitObj(obj) {
  let keys = [], values = [];
  const keys_ = Object.keys(obj);
  for (let i = 0; i < keys_.length; i++) {
    keys.push(keys_[i]);
    values.push(obj[keys_[i]]);
  }
  values = await Promise.all(values);

  let result = {};
  for (let j = 0; j < keys.length; j++) {
    result[keys[j]] = values[j];
  }

  return result;
}

