var querystring=require("querystring"),
    https = require("https"),
    querystring = require("querystring"),
    username,
    password,
    HOST = 'accounts.google.com',
    PORT = '443',
    PATH = '/ServiceLoginAuth',
    METHOD = 'POST'

exports.execute = function(dsh, galx, username, password, cookie, callback){
    var post_string = querystring.stringify({
      service:"sj",
      dsh:dsh,
      GALX:galx,
      pstMsg:"1",
      dnConn:"",
      checkConnection:"youtube:138:1",
      checkedDomains:"youtube",
      timeStmp:"",
      secTok:"",
      Email:username,
      PersistentCookie:"no",
      Passwd:password,
      signIn:"Sign+in"
    })
    console.log(post_string)
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
    post_req.write(post_string);
    post_req.end();
}

