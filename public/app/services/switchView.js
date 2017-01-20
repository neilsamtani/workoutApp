(function() {
    angular.module('app')
        .value('switchView', {        
            switchWorkoutView: switchWorkoutView
        });
    
    var switchedToggle = false;
    
    function switchWorkoutView(){
        var old_switch = switchedToggle;
        switchedToggle = !switchedToggle;
        console.log('view switched from '+ old_switch + " to " + switchedToggle);
        return switchedToggle;
    }
    
}());