(function() {

    angular.module('app')
        .controller('MenuController', ['$location','$scope', 'workout', 'dataService', 'logger', 'badgeService', '$route', 'switchView', "auth", "$cookies","constants", "headerService", MenuController]);


    function MenuController($location, $scope, workout, dataService, logger, badgeService, $route, switchView, auth, $cookies, constants, headerService ) {
            mc = this;
            mc.authService = auth;
            mc.header = headerService;
            mc.workoutCount = 0;
            mc.workoutsRemaining = 150;
            mc.badge = 'Good luck!';
            mc.constants = constants;
            mc.loadHeader = false;
        
            
        
            mc.logoutUser = function() {
                mc.authService.logoutUser();
                mc.authService.User = "";
                mc.authService.logoutStatus = vm.logoutStatus;
                $cookies.remove('User');    
                $location.path("/logout");    
                    
            }
            
             $scope.$on('header:updated', function(event, data){
                 console.log('noted a change in ' + mc.header.headerReadyGet())
                 mc.loadHeader = data;
                 mc.workoutCount = mc.header.getWorkoutCount();
                 mc.workoutsRemaining = mc.header.getWorkoutsRemaining();
                 mc.badge = mc.header.getBadge();
                 $scope.$apply();
             })
                
             if (!mc.authService.User){
                console.log("redirect to login");
                $location.path("/logout");    

            }   
        
    }
    
 
    
}());