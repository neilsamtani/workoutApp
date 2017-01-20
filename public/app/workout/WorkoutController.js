(function() {

    angular.module('app')
        .controller('WorkoutController', ['$location','$scope', 'workout', 'dataService', 'logger', 'badgeService', '$route', 'switchView', "auth", "headerService", WorkoutController]);


    function WorkoutController($location, $scope, workout, dataService, logger, badgeService, $route, switchView, auth, headerService) {

        var vm = this;
        vm.appName = workout.appName;
        vm.measurementView = false;
        vm.badge = "";
        $scope.authService = auth;
        $scope.badgeService = badgeService;
        vm.header = headerService;
        vm.workoutCalendar = [];
        vm.workoutsThisMonth = 0;
        $scope.workoutDataNotPrepared = true;
        
        $scope.$on('userLogout', function(){
            console.log('log out triggered');
           cleanUpLogout();
        });

        
        vm.refreshData = function(){
                if ($scope.authService.User){
                     console.log('getting data for '+$scope.authService.User)
                dsPromise = dataService.getAllWorkouts($scope.authService.User);
                dsPromise    
                .then(getWorkoutsSuccess);
                } else {
                    //vm.workoutCalendar.length=0;
                    console.log('no user set');
                }

           
            //$route.reload();   

        };
        
    
        
        
        function getWorkoutsSuccess(response) {
            
            console.log("here we are... successful response");
            console.log(response);
            //throw 'error in success handler';
            if(response.length>0){
                vm.workoutCalendar = response;
               
                vm.workoutCount = vm.workoutCalendar.length;
                vm.workoutsRemaining = 150-vm.workoutCalendar.length;
                
                console.log('number of workouts: '+ vm.workoutCount)

                vm.workoutsThisMonth = 0;

                vm.badge = getBadgeStatus();
            }
            $location.path('/'); 
            $scope.workoutDataNotPrepared = false;
            vm.header.workoutCount = vm.workoutCount;
            vm.header.workoutsRemaining = vm.workoutsRemaining;
            
            vm.header.setWorkoutCount(vm.workoutCount);
            vm.header.setWorkoutsRemaining(vm.workoutsRemaining);
            
            vm.header.setBadge(vm.badge);
            
            vm.header.headerReadySet(true);
    
            $scope.$apply();

        }
        
        var getBadgeStatus = function(){
            return badgeService.retrieveBadge(vm.workoutCalendar, vm.workoutsThisMonth);
        }        
        
        function getWorkoutsNotification(notification) {
            //console.log('Promise Notification: ' + notification);
        }
        
        function errorCallback(errorMsg) {
            console.log('Error Message: ' + errorMsg);
        }
        
        function getAllWorkoutsComplete() {
            $log.awesome('All workouts retrieved');
        }        
        
        vm.measurementsRecords = dataService.getAllMeasurements();
        //vm.totalWorkouts = vm.workoutCalendar.length;
        //console.log('this is supposed the be the total workouts going to badge service' + vm.totalWorkouts);
        vm.getBadge = badgeService.retrieveBadge;                
        
        vm.switchView = function(){
            console.log('hitting that switch' + vm.measurementView);
            vm.measurementView = switchView.switchWorkoutView();
            console.log('output is '+vm.measurementView);
           // $route.reload();
        };
        
        function cleanUpLogout(){  
            console.log('i have logged off from workout controller');
            if (vm.workoutCalendar){
                while(vm.workoutCalendar.length > 0) {
                    console.log('ditching calendar ' + vm.workoutCalendar.length);
                    vm.workoutCalendar.pop();
                }    
                vm.workoutCount = 0;
                vm.workoutsRemaining = 0;
                vm.workoutsThisMonth = 0;
                vm.badge = "";
                $scope.badgeService.badgeAssigned="";
            }
            console.log('clear');
             
        }
        

        
        //initial load
    vm.refreshData();             
                
                
    }

    
}());