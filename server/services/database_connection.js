
var express = require('express');
var workouts = require('../routes/workouts');

var fs = require('fs');
var router = express.Router();

var mongoose = require('mongoose');
var dataTypeModel = "";
var datatTypeSchema = "";
var connection = mongoose.connect('mongodb://localhost/workout');
var resultsOfQuery = "Blank";
var promise = new mongoose.Promise;
var resultSet = [];
  
var workoutSchema = new mongoose.Schema({
              workoutDate: { type: Date, default: Date.now },
              workoutExercise: String,
              note: String,
            });

var workoutFromMongo = mongoose.model('workoutModel', workoutSchema);

console.log('loaded the connection');

resultsOfQueryFn = function(getWorkoutData_){
    var test_ = getWorkoutData_(function(){
        console.log('done! ');
        //return ['test', 'tester'];
        workouts.getWorkoutData(['test', 'tester']);
    });
    
return test_;
    
//    console.log('starting array');
//    var testArray = [];
//        for(i=0; i<resultSet.length; i++){
//            console.log('reading exercise ' + i );
//            testArray.push( resultSet[i]);
//            }
//    
 //   return testArray;
    
}


function getWorkoutData_(resultsOfQueryFn){
    
    var workoutsCount = 0;
    
    var query = workoutFromMongo.find({});

           workoutFromMongo.count({}, function(err, c) {
                workoutCount = c;
           })
    
           promise = query.exec(function(err, workouts) {
        if (err) { return console.error(err) }
        else {
            for(i=0; i<workoutCount; i++){
                resultSet.push(workouts[i]);
                    console.log('added exercise ' + i + 'of ' + workoutCount);

            }
        }
               resultsOfQueryFn();
    });
}
            


            // var newWorkout = new workoutFromMongo({workoutExercise: 'Freeletics / Gym', note: 'Getting there...'});

            // Save it to database
//            newWorkout.save(function(err){
//              if(err)
//                console.log(err);
//              else
//                console.log(newWorkout);
//            });
//} 

 module.exports.resultsOfQuery = resultsOfQuery;
 module.exports.resultsOfQueryFn = resultsOfQueryFn;