const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Secret_Key = process.env.TOKEN_SECRET_KEY;

const generateAccessToken = (id, name) => {
  return jwt.sign({ userId: id, name: name }, Secret_Key);
};

exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address1, address2, password1, password2 } = req.body;
        bcrypt.hash(password2, 10, async (err, hash) => {
          await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address1: address1,
            address2: address2,
            password1: hash,
            password2: hash,
          });
          res.status(200).json({ success: "true", message: "User Created Successfully..!" });  
        })
    } catch (error) {
        res.status(400).json({ error: 'Error While Calling Sign Up Api', success:'false', message:'Something Went Wrong! Please try again.' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email1, password } = req.body;
        const user = await User.findOne({ where: { email: email1 } });
        bcrypt.compare(password, user.password2, (err, resp) => {
            if (resp == true) {
                res.status(200).json({ message: "Logged In Successfully..!", token: generateAccessToken(user.id, user.firstName) });
            } else {
                res.status(400).json({ error: "Invalid Email or Password" });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}