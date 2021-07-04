const router = require('express').Router();

router.post('/register', (req, res) => {
	res.send('Registration takes place here');
});

router.post('/login', (req, res) => {
	res.send('Logging in takes place here');
});

module.exports = router;
