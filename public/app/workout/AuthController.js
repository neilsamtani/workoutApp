(function() {
    
    angular.module("app")
        .controller("AuthController", ["auth", "$location", "$scope","$cookies","$route","headerService", AuthController]);
    
        function AuthController(auth, $location, $scope, $cookies, $route, headerService){
    
        vm = this;    
        vm.User = "";
        vm.userName = "";    
        vm.userIsSet = false;
        vm.header = headerService;
        vm.statusFB = "";    
        vm.fbName = "";
            
        $scope.authService = auth;
        
        var cookieUserName = loadUserDataFromCookies();    
        
        if (cookieUserName){
            vm.User = cookieUserName;
            vm.userName = vm.User;
            $scope.authService.User = vm.User;
        }
            
      function statusChangeCallback(response) {
        console.log(response);
        if (response.status === 'connected') {
            vm.statusFB = response.status;
        } else if (response.status === 'not_authorized') {
            vm.statusFB = response.status;
        } else {
             vm.statusFB = response.status;
        }
          return response.status;

      }            
        
            
            
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
            console.info('status was found to be: '+vm.statusFB);
            if(vm.statusFB=='connected'){
                vm.fbName = $scope.authService.setFBName();
                if(!$scope.$$phase) {
                    $scope.$apply();
                }  else { 
                
                }
                };
            });
        
        
        function proceedWithFB(){        
                vm.loginUser(response.authResponse.userID);
                $location.path('/');
                $route.reload();
            }
     
            

            
        vm.loginUser = function(formUserName) {
            if (formUserName=='facebook'){
                console.log('fb?');
                formUserName = $scope.authService.returnName();
                console.log('fb name is ' + formUserName);
            }
           vm.User = auth.loginUser(formUserName);
            console.log('f ' + formUserName);
            $scope.authService.User = vm.User;
            $cookies.put('User', vm.User);
            $scope.$emit('userLogin');
            vm.userIsSet = true;
            console.log('user is SET to ' + vm.User);
            $location.path('/');    
    
        };    
            
        vm.logoutUser = function() {
            vm.logoutStatus = auth.logoutUser(vm.User);
            vm.header.headerReadySet(false);
            vm.userName = "";
            $scope.authService.logoutStatus = vm.logoutStatus;
            $scope.authService.User = "";   
            $cookies.remove('User');
            $scope.$emit('userLogout');
             $location.path('/logout');    
            console.log('cookie?'+$cookies.get('User'));
            vm.userIsSet = false;
            console.log('user is not set');
            

        }
         
        function loadUserDataFromCookies(){
            console.log('getting data from COOKIE');
            var cookieUserTemp = $cookies.get('User');
            if (cookieUserTemp)
                {   console.log('found '+ cookieUserTemp +' from COOKIE');
                    return cookieUserTemp;
                }
            
        }
        
        }
            
}());
    
