var querystring=require("querystring"),
    https = require("https"),
    querystring = require("querystring"),
    username,
    password,
    HOST = 'accounts.google.com',
    PORT = '443',
    PATH = '/CheckCookie?service=sj&chtml=LoginDoneHtml&checkedDomains=youtube&checkConnection=youtube%3A138%3A1&pstMsg=1',
    METHOD = 'GET'

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

