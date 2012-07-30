var querystring=require("querystring"),
    https = require("https"),
    querystring = require("querystring"),
    username,
    password,
    HOST = 'accounts.google.com',
    PORT = '443',
    PATH = '/ManageAccount',
    METHOD = 'GET',
    ERROR_MESSAGE = "Username and Password is undefined"

exports.execute = function(cookie, callback){
    var post_options = {
      host: HOST,
      port: PORT,
      path: PATH,
      method: METHOD,
      headers:{
        cookie:cookie
      }
    }
    var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8')
      res.body = ''
      res.on('data', function (chunk) {
        res.body += chunk
      });
      res.on('end', function() {
        callback(null,res.headers['set-cookie'])
      })
    })
    post_req.write("");
    post_req.end();
}

