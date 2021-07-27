const router = require('express').Router();
const { authProtection, isSuperAdmin } = require('../middleware/authStrategy');

const { getAllUsers, changeUserDesignation, deleteParticularUser } = require('../controllers/user');

router.get('/', [authProtection, isSuperAdmin], getAllUsers);

router.patch('/:userId/changedesignation', [authProtection, isSuperAdmin], changeUserDesignation);

router.delete('/:userId', [authProtection, isSuperAdmin], deleteParticularUser);

module.exports = router;
