const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

const  UserSchema = new mongoose.Schema ({
name: {
  type: String,
  require: true,
},
email:{
 type: String, 
 unique: true,
 required: true,
 lowercase: true,
},
password:{
 type:String,
required:true,
select: false,
},
createdAt:{
type: Date,
default: Date.now,
},
});
UserSchema.pre('save', function(next){
const hash = await bcrypt.hash(this.password, 10);
this.password = hash;

})

const user = mongoose.model('User', UserSchema);

module.exports = User;