
const UserDb = require('../Models/UserModel');
const bcrypt = require('bcrypt');

const ragister = async (req,res) => {
    try {
        const {userName, email, password} = req.body;
        if(!userName || !email || !password) return res.status(200).json({message: 'Please enter all fields'});
        let user = await UserDb.findOne({email})
        if(user) return res.status(200).json({message: 'User already exists'});
        encryptedPassword = await bcrypt.hash(password, 10);
        // Create user in our database
        await UserDb.create({
          displayName: userName,   // userName
          email: email, // sanitize: convert email to lowercase
          password: encryptedPassword,
        })
        .then(user => {
            res.status(200).json({message: 'User created successfully'});
        })
        .catch(err => {
            res.status(400).json({message: err});
        })
    } catch (error) {
        console.log('found error',error);
    }
}

module.exports = {ragister};