const router = require('express').Router();
const UpdatePassword = require('../controllers/UpdatePassword');


router.post('/update-password', UpdatePassword.update);

module.exports = router;