const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});


//Creating the hasehd passwords
userSchema.virtual('password')
.set(function() {
  //Create a temp password from the one inputed
  this._password = password
  //generate a timestamp
  this.salt = uuidv1()
  //encrypt password using a function
  this.hashed_password = this.encryptPassword(password)

})
.get(function() {
  return this._password
})

//methods for the userSchema
userSchema.methods = {
  encryptPassword: function(password) {
    if(!password) return "";
    try {
      //use encryption sha1 using the salt that was provided
      return crypto.createHmac('sha1', this.salt)
      //update password
      .update(password)
      .digest('hex');
    } catch (err){
      return "";
    }
  }
}

module.exports = mongoose.model("User", userSchema);