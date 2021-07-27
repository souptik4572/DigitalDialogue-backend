const router = require('express').Router();

const { getAllUsers, changeUserDesignation, deleteParticularUser } = require('../controllers/user');

router.get('/', getAllUsers);

router.patch('/:userId/changedesignation', changeUserDesignation);

router.delete('/:userId', deleteParticularUser);

module.exports = router;
