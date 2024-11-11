const Expo = require('../model/expo');
const createError =require('http-errors');
const mongoose = require('mongoose');


module.exports= {

    // Adding data to the DB

    addExpo:async(req,res,next)=>{
        //console.log(req.body);
        //res.send(req.body);
        try{
            const expo = new Expo(req.body)
            const result = await expo.save();
            res.send(result)
        } catch(error) {
            console.log(error.message);

            if(error.name ==="ValidationError") {
                next(createError(422, error.message))
                return;
        }
        next(error)
    }
    
    },

//geting specific event by ID from the DB

getExpoById: async (req, res, next) => {

const id = req.params.id;
try {
    const expo = await Expo.findById(id)
    if(!expo) {
        throw (createError (404, "expo does not exist"))
    }
    res.send(expo)
}catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){
        next(createError(400,"Invalid expo ID"));
        return;
    }
    next(error)
}

},

    // Getting all data FROM the DB

    getAllexpo: async (req,res,next)=>{
        
        try{

            Expo.find({}).then((expo)=>{
                res.send(expo)
            });

        } catch(error) {
            console.log(error.message);

        }

    },

    // Updating data FROM  the DB

    updateExpo:async(req,res,next)=> {
        try{
            const id = req.params.id;
            const update = req.body;
            const options ={new: true}
            const result = await Expo.findByIdAndUpdate(id,update,options)

            if(!result){
                throw (createError(404, "expo does not exist"))
            }

             res.send(result);
        }catch(error){
    
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                return next(createError(400, "Invalid expo id"));
            }
        }
        //next(error);
    },

// deleting data FROM  the DB

        deleteExpo : async (req,res,next) => {
            const id = req.params.id
            try{
                const expo = await Expo.FindByIdAndDelete(id)
                if(!expo){
                    throw (createError(404,"expo does not exist"))
                   
                } 
                res.send(expo);
            }catch(error){
                    console.log(error.message)
                    if(error instanceof mongoose.CastError){
                        next(createError (400, "Invalid expo Id"));
                        return;
                }
            }
        }
    
}