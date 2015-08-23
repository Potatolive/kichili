angular.module('starter.services', [])

.factory('User', function($timeout, $firebaseAuth) {
  // Might use a resource here that returns a JSON array
  var ref  = new Firebase('https://sample-authentication-app.firebaseio.com/');
  var auth = $firebaseAuth(ref);
  var user = {};
  // Some fake testing data
  return {
    login: function(email, password, callback) {
      auth.$authWithPassword({
        email: email,
        password: password,
        rememberMe: false
      }).then(function(res) {
        user = res;
        if(callback) {
          $timeout(function(){
            callback(res);
          });
        }
      }, function(err) {
        callback(err);
      });
    }, 
    register: function(email, password, callback) {
      auth.$createUser(email, password).then(function(res){
        user = res;
        if(callback) {
          callback(res);
        }
      }, function(err) {
        callback(err);
      });
    },
    getUser: function() {
      return user;
    },
    logout: function() {
      auth.$logout();
      user = {};
    }
  };
});