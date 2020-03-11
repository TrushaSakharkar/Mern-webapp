const mongoose = require('mongoose');

let Userd = new mongoose.Schema({
    username: {
        type: String
    },
    password:{
        type: String
    },
    vendor:{
        type: String
    },
    rating:{
        type:Number
    },
    number:{
        type:Number
    }
});

Userd.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);

}
Userd.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('Userd', Userd);