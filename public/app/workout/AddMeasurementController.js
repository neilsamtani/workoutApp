(function() {

    angular.module('app')
        .controller('AddMeasurementController', ['$scope', 'workout', 'dataService', 'logger', 'badgeService', '$route', '$log', '$location','auth', AddMeasurementController]);


        function AddMeasurementController($scope, workout, dataService, logger, badgeService, $route, $log, $location, auth) {
        
            var vm = this;
            vm.newMeasurement = {};
            $scope.authService = auth;
            vm.newMeasurement.User = $scope.authService.User;
                        
            vm.saveMeasurement = function($scope) {
//                console.log(vm.authService.User);
                console.log('and in our scope: '+vm.newMeasurement.User);
                dataService.addMeasurement(vm.newMeasurement);
                $location.path('/');                
            };

        }
    
}());
