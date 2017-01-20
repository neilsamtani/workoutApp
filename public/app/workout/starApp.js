var starApp = angular.module('starApp', []);

starApp.controller('StarCtrl', ['$scope', function ($scope) {
    $scope.ratings = [{
        current: 5,
        max: 10
    }, {
        current: 3,
        max: 5
    }];
}]);