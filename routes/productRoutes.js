const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, productController.createProduct);
router.get('/:id', auth, productController.getProductById);
router.get('/', auth, productController.getProductsPaginated);
router.patch('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
