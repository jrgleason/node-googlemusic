var assert = require('assert')
  , cookie = require('../lib/getCookie')
  , nock = require('nock')

describe('cookie', function(){
  
  describe('#execute()',function(){
    it('Should return a cookie', function(){
      nock('https://accounts.google.com')
                .get('/ServiceLogin?service=sj')
                .reply(200, '<input type="hidden" name="dsh" id="dsh" value="-4906219821262685280"><input type="hidden" name="GALX" value="eSdl2XQF6dk">', {'set-cookie': 'MMMMM Cooookie'} );
      cookie.execute(function(err,dsh,galx,cookie){
        assert.equal('-4906219821262685280',dsh,"DSH is invalid")
        assert.equal('eSdl2XQF6dk',galx,"GALX is Invalid")
        assert.equal('MMMMM Cooookie',cookie,"Cookie is Invalid")
      })
    })
  })
  describe('#execute()',function(){
    it('Testing Integration', function(){
      try{
        cookie.execute(function(err,dsh,galx,cookie){
          console.log(dsh+"|"+galx+"|"+cookie)
          //assert.notEqual(undefined,dsh,"DSH is invalid")
          assert.equal('sd','ds',"DSH is invalid")
          assert.notEqual(undefined,galx,"GALX is Invalid")
          assert.notEqual(undefined,cookie,"Cookie is Invalid")
        })
      }
      catch(err){
        console.log("Error:"+err)
      }
      console.log("Ending")
    })
  })


})
