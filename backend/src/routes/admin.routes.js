const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

// Protected Admin routes
router.get('/stats', authMiddleware, adminMiddleware, adminController.getDashboardStats);

module.exports = router;
