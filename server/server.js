const express = require('express');
var app = express();
var bodyParser = require('body-parser');
const AccountModel = require('./models/account');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/register', (req, res, next) => {
     var username = req.body.username;
     var password = req.body.password;
     
     console.log(username, password);
     
     AccountModel.create({
          username: username,
          password: password
     })
     .then(data => {
          res.json('New account is created.')
     })
     .catch(err => {
          res.status(500).json('Failed to create the account!')
     })

})

app.get('/', (req, res, next) => {
     res.json('Hello');
})

app.listen(3000, () => {
     console.log('Server started listening on port 3000.');
})