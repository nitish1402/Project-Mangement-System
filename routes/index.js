
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};

exports.partials = function (req, res) {
  var name = req.params.name+".html";
  console.log("name "+name);
  res.render('partials/' + name);
};

exports.Upartials = function (req, res) {
  var name = req.params.name+".html";
  res.render('partials/user/' + name);
};
