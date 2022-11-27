
const n_util = require('util');

module.exports.inspect = inspect;

if (require.main === module) {
  console.log(inspect({x:{y:{z:{a:42}, g:"booya"}}}))
}

function inspect(x) {
  return  n_util.inspect(x, false, null, true);
}
