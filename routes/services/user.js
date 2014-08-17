
//here we ww will be connecting to the database


var ser = require('./services');

exports.signin = function(req,res)
{
  var sql = 'SELECT * from login WHERE username=$1';
  ser.login(req,res,sql);
}
