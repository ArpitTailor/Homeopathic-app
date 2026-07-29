const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

// Protected User routes
router.post('/', authMiddleware, orderController.createOrder);
router.get('/me', authMiddleware, orderController.getMyOrders);

// Protected Admin routes
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

module.exports = router;
