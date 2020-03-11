const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const flash = require('connect-flash')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

//let User = require('./models/user');
let Userd = require('./models/userd');
let Customer = require('./models/customer');
let Newproduct = require('./models/newproducts');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Getting all the customers
userRoutes.route('/customers').get(function(req, res) {
    Customer.find({vendor: saveuser},function(err, users) {
        console.log(users);
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
    res.redirect('/')
    res.send("1");     
});
//searchproduct2
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
           // console.log(users);
            res.json(users);
        }
    });
});

//myorder
userRoutes.route('/myorder').get(function(req, res) {
    console.log(saveuser);
      Customer.find({username: saveuser},(function(err, users) {
         // console.log(users);
      
          if (err) {
              console.log(err);
          } else {
             // console.log(users);
              res.json(users);
          }
      })
      )
});

//status
userRoutes.route('/status').post(function(req, res) {
    console.log("trusha")
    Newproduct.find({username: req.body.vendor,name:req.body.product},(function(err, users) {
      console.log(users);
        if(users[0].cancel==true)
        {
            res.send("cancel");
        }
        else if(users[0].dispatched==true)
        {
            res.send("dispatch");
        }  
        else if(users[0].curr_quantity==0)
        {
            res.send("palce");
        }
        else
        {
            vari=users[0].curr_quantity;
            res.send(JSON.stringify(vari));
        }
    }))
});

//review
userRoutes.route('/review').post(function(req, res) {
    console.log("trusha")
        Userd.findOne({username:req.body.vendor},(function(err, users) {
            console.log(users)
            var k,m,t;
                m=req.body.review;
               t=Number(m);
               k=users.number*users.rating;
               m=k+t;
               users.number+=1;
               k=m/users.number;
               users.rating=k;
               console.log(users.rating)
               users.save();
               // .then(console.log(users));
        }))
});

//dispatch
userRoutes.route('/dispatched').post(function(req, res) {
    Newproduct.find({username:saveuser,dispatched:true},(function(err, users) {
        if (err) {
            console.log(err);
        } else {
           // console.log(users);
            res.json(users);
        }
    }))
});

//cancel
userRoutes.route('/cancel').post(function(req, res) {
    Newproduct.findById(req.body.id,function(err, users) {
       // users.avail_amount = req.body.avail_amount;
        users.cancel = true;
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

//productreview
userRoutes.route('/productreview').post(function(req, res) {
    console.log("hasbchas");
    console.log(req.body);
    Customer.findById(req.body.id,function(err, users) {
        console.log(users);
        users.rating=req.body.productrating;
        users.review=req.body.productreview;
        console.log(users);
        users.save();
    });
});

//addtocustomer
userRoutes.route('/addtocustomer').post(function(req, res) {
    console.log("hasbchas");
    tok=req;
    console.log(req.body.value);
    Newproduct.findById(req.body.id,function(err, users) {
        users.curr_quantity=users.curr_quantity-req.body.value;
        users.save();
        let user = new Customer();
        user.username=saveuser;
        user.vendor=users.username;
        user.product=users.name;
       user.quantity=req.body.value;
       user.rating=0;
       user.review='fine';
        console.log(user);
        user.save()
            .then(
                user => {
                res.status(200).json({'product': 'product added successfully'});
            })
            .catch(err => {
                res.status(400).send('Error');
            });
    });
});

//edit
userRoutes.route('/edit').post(function(req, res) {
    console.log("hasbchas");
    console.log(req.body.edit);
        Customer.findById(req.body.id,function(err, users) {
            Newproduct.findOne({username:users.vendor,name:users.product}, function(err, user){
                if(user.curr_quantity<=0 || user.dispatched==true || user.cancel==true)
                    {
                        res.send("no");
                    }
                else
                {
                    user.curr_quantity=user.curr_quantity+users.quantity;
                    user.curr_quantity=user.curr_quantity-req.body.edit;
                    user.save();
                     users.quantity=req.body.edit;
                     console.log(users.quantity);
                     users.save();
                     res.send("yes");
                }
            })
        })
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    if(!(req.body.password && req.body.username && req.body.vendor)){
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
        user.rating='0'
        user.number=0
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
        console.log(user.quantity);
            user.dispatched=false;
            user.ready=false;
            user.cancel=false;
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
    if(!(req.body.password && req.body.username)){
        console.log("HI there"+req.body.password)
       // res.status("408");
        res.send("5");
     }
     else
     {
    Userd.find({username: req.body.username}, function(err, user){
        
        if(!user.length){
            console.log("New user..pls register or invalid credentials");
            res.send("1");
           }
        else{
            Userd.find({password: req.body.password}, function(err, userm){
          if(!userm.length)
                res.send("2");
            else
            {
                saveuser=req.body.username;
                console.log(saveuser);
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
