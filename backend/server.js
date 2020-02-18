const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var passport = require("passport");
const mongoose = require('mongoose')
const flash = require('connect-flash')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

//let User = require('./models/user');
let Userd = require('./models/userd');
let Newproduct = require('./models/newproducts');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize()); 
require("../config/passport");

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

saveuser=[];
saveproduct=[];

//getusername
userRoutes.route('/getusername').get(function(req, res) {
//console.log(saveuser);
    res.send(saveuser);
});

// Getting all the usersTrusha
userRoutes.route('/').get(function(req, res) {
    Userd.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//showproducts
userRoutes.route('/showproduct').get(function(req, res) {
    Newproduct.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//dispatched_ready
userRoutes.route('/dispatched_ready').get(function(req, res) {
    Newproduct.find({username: saveuser},function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//searchproduct1
userRoutes.route('/searchproduct1').post(function(req, res) {
    console.log(req.body.name);   
    saveproduct=req.body.name;
    res.send("1");     
});
//searchproduct
userRoutes.route('/searchproduct2').get(function(req, res) {
    Newproduct.find({name: saveproduct},function(err, users) {
        console.log(users)
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//showmyproducts
userRoutes.route('/showmyproduct').get(function(req, res) {
  console.log(saveuser);
  var mu={name: 1}
    Newproduct.find({username: saveuser}).sort(mu).exec(function(err, users) {
       // console.log(users);
    
        if (err) {
            console.log(err);
        } else {
            console.log(users);
            res.json(users);
        }
    });
});

//dispatchbutton
userRoutes.route('/dispatchbutton').post(function(req, res) {
    Newproduct.findById(req.body.id,function(err, users) {
       // users.avail_amount = req.body.avail_amount;
        users.dispatched = true;
        users.save()
            .then(body => {
                res.json({
                    body
                });
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
    });




// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    if(!req.body.password || !req.body.username){
        console.log("HI there"+req.body.password)
       // res.status("408");
        res.send("1");
     }
     else {
        
        Userd.find({username: req.body.username,vendor: req.body.vendor}, function(err, user){
           // console.log(user);
        if(user.length){
           // res.status("412");
        res.send("2");
      
        // alert('Already exists');
           }
        else{
        let user = new Userd(req.body);
        saveuser=req.body.username;
     //   console.log(saveuser);
            user.save()
                .then(user => {
                    if(req.body.vendor==='Vendor')
                    res.send('3');
                    else
                    {
                    res.send('4');

                    }
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        }
            });
    }
});
    
//adding new product
userRoutes.route('/addproduct').post(function(req, res) {
    if(!req.body.price || !req.body.quantity){
        console.log("HI there")
        res.status("408");
        res.send("Invalid details!");
     }
        else{
        let user = new Newproduct(req.body);
            // console.log(user.quantity);
            user.dispatched=false;
            user.ready=false;
           user.curr_quantity=req.body.quantity;
            user.save()
                .then(user => {
                    res.status(200).json({'product': 'product added successfully'});
                })
                .catch(err => {
                    res.status(400).send('Error');
                });
        }
});


//login for user
userRoutes.route('/search').post(function(req, res) {
    if(!req.body.password || !req.body.username){
        console.log("HI there"+req.body.password)
       // res.status("408");
        res.send("5");
     }
     else
     {
    Userd.find({username: req.body.username}, function(err, user){
        
        if(!user.length){
           // alert('new user');
            console.log("New user..pls register or invalid credentials");
            res.send("1");
           // res.status(400);
           }
        else{
            Userd.find({password: req.body.password}, function(err, userm){
          //  res.send(user.params.vendor)
         // console.log("sdhbfksjdbgk");
          //console.log(userm[0].vendor);
          if(!userm.length)
            {
                res.send("2");
            }
            else
            {
        saveuser=req.body.username;
                if(userm[0].vendor==='Vendor')
                {res.send('3');}
                else
                {
                res.send('4');

                }
            }         
        });
        }
    });
     }
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Userd.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
