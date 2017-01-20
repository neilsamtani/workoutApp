// this service takes the amount of work outs in the last 30 days and 

(function () {

    angular.module('app')
        .factory('headerService', ['$rootScope', 
 
    function headerService($rootScope) {
        return {
            headerReadySet: headerReadySet,
            headerReadyGet: headerReadyGet,
            setWorkoutCount:setWorkoutCount,
            setWorkoutsRemaining:setWorkoutsRemaining,
            getWorkoutCount:getWorkoutCount,
            getWorkoutsRemaining:getWorkoutsRemaining,
            setBadge:setBadge,
            getBadge:getBadge
        };    
    
    var headerReady = false;
    
    console.log(headerReady);

    var workoutCount = 0;
    var workoutsRemaining = 0;
    var badge = "";
    
    
    function headerReadySet(val){
        console.log('header to be set to  : ' + val);
        headerReady = val;
        $rootScope.$broadcast('header:updated',true);
        console.log('header is now ready : ' + headerReady);
        
    }
        
    function headerReadyGet(){
        return headerReady;
    }    
        
    function setWorkoutCount(val){
        console.log('workoutcount to be set to  : ' + val);
        
        workoutCount = val;
    }    
    
    function setWorkoutsRemaining(val){
            console.log('workoutremaining to be set to  : ' + val);
    
        workoutsRemaining = val;
    }
    function getWorkoutCount(){
                console.log('retrieve  : ' + workoutCount);

        return workoutCount;
    }    
    
    function getWorkoutsRemaining(){
                console.log('retrieve  : ' + workoutsRemaining);

        return workoutsRemaining;
    }       
        
    function setBadge(val){
            console.log('badge to be set to  : ' + val);
    
        badge = val;
    }
    function getBadge(){
                console.log('retrieve  : ' + badge);

        return badge;
    }            
        
    }
    ]);
}());
    

