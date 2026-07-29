const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:slug', productController.getProductBySlug);

// Protected Admin routes
router.post('/', authMiddleware, adminMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
