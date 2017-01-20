(function() {

    angular.module('app')
          .factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]);


    function dataService($q, $timeout, $http, constants) {
        return {
            getAllWorkouts: getAllWorkouts,
            getAllMeasurements: getAllMeasurements,
            addWorkout: addWorkout,
            addMeasurement: addMeasurement,
        };
        
        userName="";

        function getAllWorkouts(userName) {

        var promise = new Promise(function(resolve, reject){
            setTimeout(function() {
                var data = [];
                console.log('2 getting data for '+userName);
                return $http({
                    method: 'GET',
                    url: 'api/workouts',
                    headers: {
                        'User': userName
                    },
                })
                .success(function(data, status, headers, config){
                    console.log("success - with timeout " + data[0]);
                    console.log(data[0]);
                    resolve(data);
                })
                .catch("failed at getAllWorkouts: "+ sendGetWorkoutError)

            }, 1000);
        });
        return promise;
    
      }
        
        
        function getAllMeasurements() {


            return [
            {
                date: '21/01/2017',
                arms: '344',
                chest: '1200',
                waist: '590',
                weight: '74'
                
            },
            {
                date: '28/01/2017',
                arms: '344',
                chest: '1200',
                waist: '590',
                weight: '74'
                
            },
            {
                date: '4/02/2017',
                arms: '346',
                chest: '1200',
                waist: '590',
                weight: '74'
                
            },             
        ];
        }             
        function sendResponseData(response) {
            // console.log(response.data);
            return response.data;

        }
        
        function sendGetBooksError(response) {

            return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');

        }        
 

        function addWorkout(newWorkout){
            return $http.post('api/workouts', newWorkout)   
            .then(addSuccess)
            .catch(sendGetWorkoutError);    
        }
        
        function addSuccess(){console.log('success');}
        
        function sendGetWorkoutError(response) {
            console.log('err' + response);
            return $q.reject('Error creating workout(s). (HTTP status: ' + response.status + ')');

        }
        
        function addMeasurement(newMeasurement){
            return $http.post('api/measurements', newMeasurement)   
            .then(addSuccess)
            .catch(sendGetWorkoutError);    
            console.log('measurement added');
        }        
        
    dataService.$inject = ['logger', '$q'];
    }
    
}());
