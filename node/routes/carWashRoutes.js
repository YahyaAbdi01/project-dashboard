const express = require('express');
const routes = express.Router();
const Expo = require('../model/expo');
const expoController = require('../controller/expoController');

//const {verifyAccessToken} = require ('../helpers/jwtHelper')

//get a list of students from the database



routes.get('/allResults',expoController.getAllexpo)

//get a specific student id


routes.get('/getExpoByid/:id',expoController.getExpoById)



//add student to the db

routes.post('/addExpo',expoController.addExpo)




//update students in the DB



routes.patch('/updateExpo/:id',expoController.updateExpo)




//delete student to the db



routes.delete('/deleteExpo/:id',expoController.deleteExpo)


module.exports = routes;