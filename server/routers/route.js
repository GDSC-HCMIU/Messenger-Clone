// Variables
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {
     userSignUp,
     userSignIn,
     firstView
} = require('../controller/task')

// Route
/**
 * 1. Sign In:      'https://localhost:5454/messenger-clone/api/user/signin' - POST
 * 2. Sign Up:      'https://localhost:5454/messenger-clone/api/user/signup' - POST, GET
 */
router.get('/', (req, res) => {
     res.redirect('signin.html');
})
router.route('/signup').post(userSignUp);
router.route('/signin').post(userSignIn);
router.get('/signin/me', auth, async (req, res) => {
     res.send(req.user);
});

// Exports module
module.exports = router;