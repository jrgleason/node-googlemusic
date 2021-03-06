var querystring=require("querystring"),
    https = require("https"),
    username,
    password,
    HOST = 'accounts.google.com',
    PORT = '443',
    PATH = '/ServiceLogin?service=sj',
    METHOD = 'GET',
    dshRegex = /"dsh" value="[^"]*/,
    galxRegex = /name="GALX"\n?.*value="[^"]*/,
    ERROR_MESSAGE = "Username and Password is undefined"
    

var getDSH = function(body){
   var dshResult = String(body.match(dshRegex));
   return dshResult.substring(13)
}

var getGALX = function(body){
   var galxResult = String(body.match(galxRegex));
   var n = galxResult.indexOf('ue="');
   return galxResult.substring(n+4)
}

exports.execute = function(callback){
    var post_options = {
      host: HOST,
      port: PORT,
      path: PATH,
      method: METHOD
    }
    var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8')
      res.body = ''
      res.on('data', function (chunk) {
        res.body += chunk
      });
      res.on('end', function() {
        callback(null,getDSH(res.body),getGALX(res.body),res.headers['set-cookie'])
      })
    })
    post_req.write("");
    post_req.end();
}

