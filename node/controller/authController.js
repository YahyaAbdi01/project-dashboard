const User = require ('../model/authModel');
const createError =require('http-errors')
const {authaaSchema} = require('../helpers/validationSchema')
const {signAccessToken} = require('../helpers/jwtHelper')

module.exports = {

// registering the User

registerUser: async(req,res, next)=>{

    try{
        const {email,password}=req.body
        if(!email || !password)throw createError.BadRequest
        
        const result = await authaaSchema.validateAsync(req.body)

        const Exists = await User.findOne({email:email})    
        
        if (Exists) throw createError.Conflict(`${email} is already registered`)
            const user = new User(result)

        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)

        res.send({accessToken});
    }catch (error) {
        if(error.isJoi === true) error.status = 422
        next(error)
    }
},


loginUser: async (req,res,next)=>{
    try{
        const result = await authaaSchema.validateAsync(req.body)
        const user = await User.findOne({email:result.email})
        if(!user) throw createError.NotFound('User not registered')

            //matching the pasword
            const isMatch = await user.isValidPassword(result.password)
            if(!isMatch) throw createError.Unauthorized('Username/Password not valid')

                //if password match then generate token
                const accessToken = await signAccessToken(user.id) 


        //res.send(result)
        res.send({accessToken})
    }catch (error){
        if (error.isJoi === true)
            return next(createError.BadRequest('Invalid username/password'))
        next(error)
    }
}

};


