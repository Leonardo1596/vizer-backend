const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
        if (err) {
            res.json({ error: err });
        }


        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpass,
        });


        // Compare hashed password with repeatPassword
        if (req.body.password !== req.body.repeatPassword) {
            console.log('Password and repeatPassword are not the same');
            return res.json({ message: 'Password and repeatPassword are not the same' });
        } else {
            console.log('Password and repeatPassword are the same');
            // res.json({ message: 'Password and repeatPassword are the same' });

            // Check if email already exists
            User.findOne({ email: req.body.email })
                .then(user => {
                    if (user === null) {
                        saveUser();
                    } else {
                        console.log('email already exists');
                        res.json({ message: 'Email already exists' });
                    }
                });

            function saveUser() {
                user.save()
                    .then(user => {
                        console.log('Successfully registered');
                        console.log(`User: ${user.username}`);
                        console.log(user);
                        res.status(201).json({ message: 'Successfully registered' });
                    })
                    .catch(error => {
                        console.log(error);
                        // res.json({ message: 'An error ocurred' });
                    });
            }
        }
    });
}


const login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.json({ error: err });
                    }
                    if (result) {

                        res.cookie('userProfile', user, {
                            maxAge: 1 * 60 * 1000,
                            httpOnly: true
                        });

                        // Create token
                        const accessToken = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_KEY, {
                            expiresIn: '60s'
                        });

                        // Successfully
                        console.log(`User: ${user.email} is signed`)

                        res.json({ token: accessToken, message: 'Successfully signed' });
                        next();
                    } else {
                        res.json({ message: 'Password is wrong!' });
                    }
                });
            } else {
                console.log('user not found');
                res.json({ message: 'User not found' });
            }
        });
};


module.exports = {
    register, login
}