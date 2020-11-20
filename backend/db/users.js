const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection
const schema = mongoose.Schema

const users_schema = new schema({
    id: String,
    type: "Facebook" | "Guest",
    name: String,
    image: String,
    detail: {
        progress: {type:[Number], default:[0,0]},
        star: {type:[Number], default:[0,0,0,0,0]},
        highscore: {type:Number, default:0}
    },
    survey: {
        pre:{
            type:{type:Boolean, default:false}
        },
        post:{
            comment:{type:String, default:""}
        }
    }
    
}
)

const users = module.exports = mongoose.model("users",users_schema)

module.exports.addnew = function(data,callback){
    users.findOne({id:data.id}).exec((err,res)=>{
        if (!res) {
            users.create(data)
        }
    }   
)}

module.exports.fetch = function(id,callback){
    users.findOne({id:id},callback)
}

module.exports.getAll = function(callback){
    users.find(callback)
}

module.exports.remove = function(callback){
    users.deleteMany({},callback)
}