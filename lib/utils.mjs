
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
