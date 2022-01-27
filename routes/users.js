const router = require('express').Router();

const { getAllUsers, changeUserDesignation, deleteParticularUser } = require('../controllers/user');

// Get all registered routes for 
router.get('/', getAllUsers);

// Update user designation (userType property)
router.patch('/:userId/changedesignation', changeUserDesignation);

// Delete a particular user
router.delete('/:userId', deleteParticularUser);

module.exports = router;
