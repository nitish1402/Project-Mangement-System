

'use strict'
//start trying to get database services from here as a module

var jwt              = require('jsonwebtoken');
var pg               = require('pg');
var expressJwt       = require('express-jwt');
var secret           = require('./config');
pg.defaults.poolSize = 10;
var dbUrl            = "tcp://nitish:nitish@localhost:5432/pms";
var user             = {};


console.log(secret.secret);

//change in design earlier we were using pg.connect for each
//request now only one time at one session we will make the conncetion
pg.connect(dbUrl,function(err,client){
  if(err)
    {
      console.log("Error in connecting to the database")
    }
  else
    {
      user=client;
    }
});


//login module
exports.login = function(req,res,sql){

  var username = req.body.username || '';
  var password = req.body.password || '';
  console.log("inside login");
  console.log(username);
  console.log(password);
  if (username == '' || password == '') {
        return res.status(401).end();
  }

  user.query(sql,[username],function(err,result){
    if(err)
    {
      console.log(err);
      res.status(501).end();
    }
    else
    {
      if(result.rows.length>0)
      {
        console.log(result.rows);
        // We are sending the profile inside the token
        var token = jwt.sign(result.rows, secret.secret, { expiresInMinutes: 60*5 });
        res.json({ token: token });
      }
    }
  });
}
