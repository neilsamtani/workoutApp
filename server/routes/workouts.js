var express = require('express');
//var workoutDAO = require('../services/database_connection');

var fs = require('fs');
var router = express.Router();
var returnarray = [];  
var resultSet = [];
var workoutCount = 0;


var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost/workout');
var resultsOfQuery = "Blank";
var promise = new mongoose.Promise;
var resultSet = [];

  
var workoutSchema = new mongoose.Schema({
              workoutDate: { type: Date, default: Date.now },
              workoutExercise: String,
              legs: Boolean,
              chest: Boolean,
              arms: Boolean,
              back: Boolean,
              abs: Boolean,
              duration: String,
              workoutType: String,
              rate: String,
              note: String,
              User: String,
            });

var workoutFromMongo = mongoose.model('workoutModel', workoutSchema);
var currentUser = "";


// workoutHandler


// based on the nature of the request, this handler will perform the get, put, post, delete of the workout records

// database_connection.js will manage the interface with MongoDB via Mongoose

/* GET all workouts and POST new workouts */
router.route('/')
    .get(function(req, res) {
        currentUser = req.get('User');

        console.log("get for" + currentUser);
        //setTimeout(wrapFunctionData,5000);
       //resultSet = wrapFunctionData();
        wrapFunctionData()
            .then (countDocs(currentUser))
            .then (getWorkoutData_)
            .then(function(){
            console.log("123 " + resultSet);
            console.log('finally, sending ' + resultSet.length+ 'documents');            
            res.send(resultSet);
            currentUser="";
            resultSet.length=0;
            promise = new mongoose.Promise;
            returnarray.length = 0;  
            res.send(resultSet);    
        })
    })

    .post(function(req, res) {

            console.log('here we are!!');
            console.log('req: '+req);
        var newWorkout = req.body;

       saveWorkoutData(newWorkout);

        res.status(201).send(newWorkout);
    });



/* GET, PUT and DELETE individual workouts */
router.route('/:id')

    .get(function(req, res) {
        var data = getWorkoutData();

        var matchingWorkouts = data.filter(function(item) {
            return item.book_id == req.params.id;
        });

        if(matchingWorkouts.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(matchingWorkouts[0]);
        }
    });



function saveWorkoutData(data) {
    
    var writeOutput =  new workoutFromMongo(data).save(function(err){
        console.log(err);
    });
    
    console.log('saved!')
};




var wrapFunctionData = function(){
     
    
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('in wrap function data, hoping for successful promise');
            resolve();
        }, 1000);
    
        
    });
    
    return promise;
    }
    
    
//   setTimeout(getWorkoutData_,2000);
//    var wrapResultSet = getWorkoutData_(function(){
//        returnarray = resultSet;
//    });

// }

function getWorkoutData_(wrapFunctionData){

    var promise = new Promise(function(resolve, reject){
        setTimeout(function() {
        
            var userName = currentUser;
            console.log('called, waiting for our response i hope!: ' + currentUser);
            console.log('2:  launching query');

            var query = workoutFromMongo.find({});
            query.where('User', userName);
            query.exec(function(err, workouts) {
                if (err) { return console.error("ERROR ERROR"+err); }

                else {
                   console.log('3:  no error');

                    resultSet.length = 0;
                console.log('4:  launching query for ' + workoutCount);

                    for(i=0; i<workoutCount; i++){
                        resultSet.push(workouts[i]);
                            console.log('added exercise ' + i + 'of ' + workoutCount);
                    }
                    console.log('so FROM WORKOUT.JS THE RESULT SET IS ' + resultSet.length);
                }
                resolve(resultSet);
                
            })
            .catch(sendGetWorkoutError)
        }, 1000);
    });
    return promise;
}   

function countDocs(userName){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function() {
            console.log('counting docs');
            workoutFromMongo.count({User:userName}, function(err, c) {
                console.log('countDocs: '+ c);
                workoutCount = c;
                resolve({workoutCount: c});    
            });
        }, 1000);
            
       });
        return promise;           
};

function sendGetWorkoutError(err){
    console.err(err);
}

 module.exports = router;
