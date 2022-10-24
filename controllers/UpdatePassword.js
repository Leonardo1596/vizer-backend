const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');


const update = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (error, result) => {
                    if (error) {
                        res.json({ error: error });
                    }
                    if (result) {
                        // console.log('passwords matched');
                        bcrypt.hash(req.body.newPassword, 10, (err, hashedpass) => {
                            if (err) {
                                res.json({ error: err });
                            }
                            const filter = { email: req.body.email };
                            const update = { password: hashedpass };
                            User.findOneAndUpdate(filter, update)
                                .then(password => {
                                    console.log('user finded and updated');
                                    res.json({ message: 'Password updated successfully' });
                                })
                                .catch(errFindOne => {
                                    console.log(errFindOne);
                                });
                        });
                    } else {
                        console.log('passwords not matched');
                        res.json({ message: 'passwords dont match' })
                    }
                })
            } else {
                console.log('user not found');
                res.json({ message: 'user not found' });
            }
        });
};




module.exports = { update };