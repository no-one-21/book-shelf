const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

// creating schema(sort of prototype of user)

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true, //making cmpulsory
        trim: true, // removing whitespaces
        unique : 1 // as this will be unique for every user
    },

    password:{
        type:String,
        required: true,
        minlength: 6
    },

    name:{
        type:String,
        maxlength: 20,
    },

    lastname:{
        type:String,
        maxlength: 20
    },

    role:{                    // to decide whether the person is administrator or not
        type:Number,
        default:0,
    },

    token:{
        type: String, 
    }


})
// pre is before anything we save//
userSchema.pre('save', function(next){
    var user= this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })                                            // hashing of password
    }
    else{
        next()
    }
})


// method to compare the password of a loggin in user and will be using bcrpyt to unhash the password 
userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

//method to create tokens using jwt which will require superpassword 
userSchema.methods.generateToken = function(cb){
    var user =  this;
    var token = jwt.sign(user._id.toHexString(),config.SECRET)
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this;
// verify will retun user id if token is correct
    jwt.verify(token,config.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })

}

userSchema.methods.deleteToken = function(token,cb){
    var user = this;
    // to log out a use , unset its token
    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user);
    })
}


const User= mongoose.model('User' , userSchema)  // name of collection and its prototype provided


module.exports = { User }


