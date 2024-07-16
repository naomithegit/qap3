const router = require('express').Router();
const productsDal = require('../services/pg.products.dal');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await productsDal.getProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(503).json({ message: 'Service Unavailable', status: 503 });
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productsDal.getProductById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found', status: 404 });
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(503).json({ message: 'Service Unavailable', status: 503 });
    }
});

// POST a new product
router.post('/', async (req, res) => {
    try {
        const { productName, productDescription, productPrice, stockQuantity } = req.body;
        await productsDal.addProduct(productName, productDescription, productPrice, stockQuantity);
        res.status(201).json({ message: 'Product created', status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(503).json({ message: 'Service Unavailable', status: 503 });
    }
});

// PUT (update) a product
router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { productName, productDescription, productPrice, stockQuantity } = req.body;
        await productsDal.updateProduct(productId, productName, productDescription, productPrice, stockQuantity);
        res.status(200).json({ message: 'Product updated', status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(503).json({ message: 'Service Unavailable', status: 503 });
    }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await productsDal.deleteProduct(productId);
        res.status(200).json({ message: 'Product deleted', status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(503).json({ message: 'Service Unavailable', status: 503 });
    }
});

module.exports = router;
