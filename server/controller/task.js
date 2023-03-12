// Variables
const User = require('../models/user');

// User sign up
const userSignUp = async (req, res) => {
     try {
          const new_user = new User(req.body);
          await new_user.save();
          const token = await new_user.generateAuthToken();
          res.status(201).json({ created_user_account: new_user, token });
          console.log('SERVER RESPONSE: A new user account is created!'); 
     } catch (error) {
          res.status(400).send(error);
          console.log('SERVER RESPONSE: Can not create a new user!');
     }
};

// User sign in
const userSignIn = async (req, res) => {
     try {
          const { email, password } = req.body;
          const user = await User.findByCredentials(email, password);
          if (!user) {
              return res.status(401).send({error: 'SERVER RESPONSE: Login failed! Check authentication credentials!'});
          }
          const token = await user.generateAuthToken();
          res.send({ user, token });
          console.log('SERVER RESPONSE: Get the user data successfully!');
          console.log('SERVER RESPONSE: User enters home page!')
     } catch (error) {
          res.status(400).send(error);
          console.log('SERVER RESPONSE: Can not get the user data!');
     };
}

const firstView = (req, res) => {
     res.render('../views/signin.html');
}

//editProfile
const editProfile = async (req, res) => {
         try {
             const id = req.query.id;
             const userData = await User.findById({_id:id}); 
             if(userData){
                 res.render('edit', {user:userData});
             } else {
                 res.redirect('/homepage');
             }
         }catch(err) {
             console.log('SERVER RESPONSE: Can not edit profile');
         }
     }

// Exports module
module.exports = {
     userSignIn,
     userSignUp,
     firstView,
     editProfile
};