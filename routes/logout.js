const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');


router.get('/logout', verifyToken, (req, res) => {
    res.clearCookie("userProfile");
    res.json({ message: 'Successfully logouted' });
});


module.exports = router;