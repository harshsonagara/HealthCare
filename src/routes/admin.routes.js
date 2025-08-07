const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller.js');
const { authenticate } = require('../middleware/auth.middleware.js');

router.use(authenticate);
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser );

module.exports = router;
