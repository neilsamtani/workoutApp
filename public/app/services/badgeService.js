// this service takes the amount of work outs in the last 30 days and 

(function () {

    angular.module('app')
        .value('badgeService', {        
            retrieveBadge: retrieveBadge
        });

    var badgeAssigned = "";
    
    function retrieveBadge(workouts, workoutsThisMonth){
        var workoutsThisMonth = workoutsLastMonth(workouts);
        console.log("getting badge");
        return assignBadge(workoutsThisMonth);
    }
    
    function workoutsLastMonth(workouts) {
        // here we will identify the number of workouts in the trailing 30 days. 
                var workoutCount = workouts.length;
                var today = new Date();
                var lastMonthThisDay = moment().startOf('day').subtract(30,'day');
                var todayMoment = moment(today, "DD/MM/YYYY"); 
                var _workoutsThisMonth = 0;

                for(i=0; i<workoutCount; i++){
                    var tempDate = moment(workouts[i].workoutDate);

                    if (tempDate.isBetween(lastMonthThisDay, todayMoment)) {
                        _workoutsThisMonth++; 
                        console.log("added one!");
                    }
                }
                console.log("returning " + _workoutsThisMonth);
                return _workoutsThisMonth;
                
    }
    
    function assignBadge(workoutsInLastMonth) {
        console.log("3");
        var badge = null;

        switch (true) {
            case (workoutsInLastMonth > 15):
                badge = 'On FIRE';
                break;
            case (workoutsInLastMonth > 10):
                badge = 'Gym nut';
                break;
            default:
                badge = 'Slacking bro';
        }
        console.log("found badge " +badge);
        return badge;

    }

}());