const bcrypt = require('bcrypt');   // for hashing password
const UserDb = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

const UserSignIn = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email && !password) return res.status(400).json({message: 'Please enter email and password'});
        const signedUser = await UserDb.findOne({email});
        if(signedUser){
            const isMatch = await bcrypt.compare(password, signedUser.password);
            if(isMatch){
                const token = jwt.sign({
                    email: signedUser.email,
                    userId: signedUser._id
                }, 'secretKey', {expiresIn: '1min'});
                return res.status(200).json({
                    message: 'User signed in successfully',
                    token: token
                });
            }
            return res.status(200).json({message: 'Invalid email or password'});
        }
        
    } catch (error) {
        res.status(400).json({message:error})
    }
}

module.exports = {UserSignIn}; // export this function