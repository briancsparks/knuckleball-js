module.exports.inspect = inspect;

if (require.main === module) {
  console.log(inspect({x:{y:{z:{a:42}}}}))
}

function inspect(x) {
  require('util').inspect(x, {depth:null, color:true});
}
