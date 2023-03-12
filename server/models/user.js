// Variables
const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


// User schema
const user_schema = mongoose.Schema({
     _id: {
          type: String,
          required: true,
          default: () => uuidv4(),
      },
     name: {
          type: String,
          required: true,
          trim: true
     },
     email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          validate: value => {
               if (!validator.isEmail(value)) {
                    throw new Error({error: 'Invalid email address!'});
               }
          }
     },
     password: {
          type: String,
          required: true,
          minLength: 7
     },
     tokens: [{
          token: {
               type: String,
               required: true
          }
     }]
});

// User sign up
user_schema.pre('save', async function(next) {
     // Hash the password before saving the user model
     const new_user = this;
     if (new_user.isModified('password')) {
          new_user.password = await bycrypt.hash(new_user.password, 8);
     };
     next();
})

user_schema.methods.generateAuthToken = async function() {
     // Generate an authentiacation token for the user
     const new_user = this;
     const token = jwt.sign({_id: new_user._id}, process.env.JWT_KEY);
     new_user.tokens = new_user.tokens.concat({token});
     await new_user.save();
     return token;
}

// User sign in
user_schema.statics.findByCredentials = async (email, password) => {
     // Search for a user data by email and address
     const new_user = await User.findOne({ email });
     if (!new_user) {
          throw new Error({ error: 'Invalid login credentials!'})
     };
     const isPasswordMatch = await bycrypt.compare(password, new_user.password);
     if (!isPasswordMatch) {
          throw new Error({ error: 'Invalid login credentials' });
     };
     return new_user;
}

const User = mongoose.model('User', user_schema);

// Exports module
module.exports = User;

