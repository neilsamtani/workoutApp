(function() {

    var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngCookies', 'socialLogin']);

    app.provider('workout', ['constants', function (constants) {

        var includeVersionInTitle = true;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };

        this.$get = function () {

            var appName = constants.APP_TITLE;
            var version = constants.APP_VERSION;

            if (includeVersionInTitle) {
                appName += ' ' + version;
            }

            var appDesc = constants.APP_DESCRIPTION;

            return {
                appName: appName,
                appDesc: appDesc
            };
        };
    }]);

    app.config(['workoutProvider', 'constants', 'dataServiceProvider', '$routeProvider', function (workoutProvider, constants, dataServiceProvider, $routeProvider) {

        workoutProvider.setIncludeVersionInTitle(true);
        
        $routeProvider
            .when('/login', {
                templateUrl: '/app/templates/login.html', 
                controller: 'AuthController',
                controllerAs: 'auth'
            })        
            .when('/logout', {
                templateUrl: '/app/templates/logout.html', 
                controller: 'AuthController',
                controllerAs: 'auth'
            })              
            .when('/', {
                templateUrl: '/app/templates/workouts.html', 
                controller: 'WorkoutController',
                controllerAs: 'workouts'
            })
            .when('/addWorkout', {
                templateUrl: '/app/templates/addWorkout.html',
                controller: 'AddWorkoutController',
                controllerAs: 'workoutAdder'
            })
            .when('/reviewWorkout/:workoutID', {
                templateUrl: '/app/templates/reviewWorkout.html',
                controller: 'ReviewWorkoutController',
                controllerAs: 'workoutReviewer'
            })
            .when('/measurements', {
                  templateUrl: '/app/templates/measurements.html',
                  controller: 'MeasurementsController',
                  controllerAs: 'measurements'
            })
            .when('/addMeasurement', {
                templateUrl: '/app/templates/addMeasurement.html',
                controller: 'AddMeasurementController',
                controllerAs: 'measurementAdder'
            })
            .otherwise('/');
        
   
        

    }]);

}());