// this is the starting point for any application.
const express= require('express');
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV); // putting just in case we deploy it on heroku

const app=express();

mongoose.Promise = global.Promise; //mongoose by default dont have promise functionality ,so we need to set it for them
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Book } = require('./models/book');
const {auth} = require('./middleware/auth');
//using middlewares
app.use(bodyParser.json());
app.use(cookieParser());


// making routes.
//Get//
app.get('/api/getBook', (req,res)=>{
    let id = req.query.id;  // let us try and find the book from database using its id

    Book.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc); 
    })
})

app.get('/api/books',(req,res)=>{
    // trying to make our query something like this localhost:3001/api/books?skip=3&limit=2&order=asc
    let skip= parseInt(req.query.skip);
    let limit= parseInt(req.query.limit);
    let order= req.query.order;

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })


})


//Post//
app.post('/api/book', (req,res)=>{
    const book =  new Book(req.body)           //requuest.body contains all of the data which we want to post according to schema format

    book.save((err,doc)=>{                     // to save the data in database
        if(err) return res.status(400).send(err);
        res.status(200).json({                      // if data to be saved is successful , we will be sending a json message // which will be taken to react with the hwlp of redux state
            post:true,
            bookId: doc._id
        }) 
    })
})


app.get('/api/getReviewer',(req,res)=>{
    let id= req.query.id;

    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name:doc.name,
            lastname: doc.lastname
        })
    })
})

app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.get('/api/user_posts',(req,res)=>{
    Book.find({ownerId:req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
})


app.post('/api/register',(req,res)=>{
    const user= new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

app.post('/api/login',(req,res)=>{

    User.findOne({'email':req.body.email}, (err,user)=>{
        if(!user) return res.json({isAuth:false, message:'email not found'})

        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message: 'Wrong Password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                     isAuth:true,
                     id:user._id,
                     email:user.email
                })
            })    
        })
    })
})

// using middleware auth , just to make sure , that user is already logged in , before we log him out
app.get('/api/logout',auth,(req,res)=>{
    // inside the request we have the user
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    })
})


//update//
app.post('/api/book_update', (req,res)=>{
    Book.findByIdAndUpdate(req.body._id, req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})

//delete//
app.delete('/api/delete_book',(req,res)=>{
    let id = req.query.id;

    Book.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true);
    })
})

const port=process.env.Port || 3001; //on 3000 our cleient will run and on 3001 our server will run
app.listen(port,()=>{
    console.log(` server running at port : ${port}`);
})