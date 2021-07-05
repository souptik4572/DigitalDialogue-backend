const router = require('express').Router();
const { registerNewUser, loginUser } = require('../controllers/authentication');

router.post('/register', registerNewUser);

router.post('/login', loginUser);

module.exports = router;
