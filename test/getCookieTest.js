var assert = require('assert')
  , cookie = require('../lib/getCookie')
  , nock = require('nock')

describe('cookie', function(){
  
  describe('#getUsername()', function(){
    it('should return  user', function(){
      cookie.setUsername("user")
      assert.equal('user', cookie.getUsername());
    })
  })
  describe('#execute()',function(){
    it('Should return a cookie', function(){
      cookie.setUsername("user");
      cookie.setPassword("password");
      nock('https://accounts.google.com')
                .get('/ServiceLogin?service=sj')
                .reply(200, '<input type="hidden" name="dsh" id="dsh" value="-4906219821262685280"><input type="hidden" name="GALX" value="eSdl2XQF6dk">');
      cookie.execute(function(err,dsh,galx,cookie){
        assert.equal('-4906219821262685280',dsh,"DSH is invalid")
        assert.equal('eSdl2XQF6dk',galx,"GALX is Invalid")
      })
    })
  })

})
