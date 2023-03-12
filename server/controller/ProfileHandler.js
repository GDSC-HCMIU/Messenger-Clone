const Profile = require("../model/Profile");
const auth = require('../middleware/auth');

module.exports = {
    editProfile: async(req, res) => {
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
}