const mongoose = require('mongoose');
const uri = 'mongodb+srv://acus:1234@cluster0.svkzqmi.mongodb.net/messengerclone?retryWrites=true&w=majority';

mongoose.connect(uri, {
     useNewUrlParser: true, 
     useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: String,
  password: String
}, {
     collection: 'account'
});

const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;
