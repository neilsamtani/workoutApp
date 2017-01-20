(function() {

    angular.module('app')
        .controller('AddWorkoutController', ['$scope', 'workout', 'dataService', 'logger', 'badgeService', '$route', '$log', '$location', 'auth',  AddWorkoutController]);

        function AddWorkoutController($scope, workout, dataService, logger, badgeService, $route, $log, $location, auth) {
        
            var vm = this;
            vm.newWorkout = {};
            $scope.authService = auth;
            vm.newWorkout.User = $scope.authService.User;
                        
            vm.saveWorkout = function($scope) {
//                console.log(vm.authService.User);
                console.log('and in our scope: '+vm.newWorkout.User);
                dataService.addWorkout(vm.newWorkout);
                $location.path('/');                
            };

        }
    
}());
