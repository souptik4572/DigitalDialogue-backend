const router = require('express').Router();
const { registerNewUser, loginUser } = require('../controllers/authentication');

// User registration route
router.put('/register', registerNewUser);

// User login route
router.post('/login', loginUser);

module.exports = router;
