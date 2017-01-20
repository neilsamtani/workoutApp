(function() {
    angular.module("app")
          .factory('auth', auth);
    
    function auth() {
        return {
            loginUser: loginUser,
            logoutUser: logoutUser,
            setFBName: setFBName,
            returnName: returnName,
        };
            
    
    //var User = "";
    var logoutStatus = "";
    var fbName = "";
    
    function setFBName(){
        FB.api('/me', {fields: 'first_name'}, function(response){
            console.log('testing service:');
            console.log(response.first_name);
            fbName=response.first_name;
            return response.first_name;
        });
        
    }    
        
    function returnName(){
        return fbName;
    }    
        
    function loginUser(userName){
        User = userName;
    
        return User;
    }
    
    function logoutUser() {
        User = "";
        logoutStatus = "User has been successfully logged out";
        return logoutStatus;
    }
  
        
    }
        
}());