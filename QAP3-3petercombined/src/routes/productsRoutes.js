const router = require('express').Router();
const productsDal = require('../services/pg.products.dal');

// GET all products on offer
router.get('/', async (req, res) => {
    try {
        const products = await productsDal.getProducts();
        res.render('products', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.render('503');
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    console.log(`Get one product request`)
    try {
        const product = await productsDal.getProductById(req.params.id);
        console.log(`product get one: ${JSON.stringify(product)}`)
        if (product)
            res.render('product', { product });
        else
            res.render('404');
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.render('503');
    }
});

// POST a new product
router.post('/', async (req, res) => {
    console.log("Post req")
    try {
        console.log(`post req data: ${JSON.stringify(req.body)}`);
        await productsDal.addProduct(req.body.productname, req.body.productdescription, req.body.productprice, req.body.stockquantity);
        const products = await productsDal.getProducts();
        res.render('products', { products });
    } catch (error) {
        console.error('Error adding product:', error);
        res.render('503');
    }
});

// PUT/update a product
router.put('/:id', async (req, res) => {
    console.log(`finally update call param: ${req.params.id}, ${JSON.stringify(req.params)} , body :${JSON.stringify(req.body)}`)
    try {
        await productsDal.updateProduct(req.params.id, req.body.productname, req.body.productdescription, req.body.productprice, req.body.stockquantity);
        const products = await productsDal.getProducts();
        res.render('products', { products });
    } catch (error) {
        console.error('Error updating product:', error);
        res.render('503');
    }
});



router.post("/:id/update", async (req, res) => {
    console.log(`update product request post method override: ${JSON.stringify(req.params)}`);
    const product = await productsDal.getProductById(req.params.id);
    res.render("edit", { product });
});


router.get("/0/add", async (req, res) => {
    console.log(`we are adding a product now... show the form`);
    res.render("add");
});

// DELETE product
router.delete('/:id', async (req, res) => {
    console.log(`Delete product request - ${JSON.stringify(req.params)}`)
    try {
        await productsDal.deleteProduct(req.params.id);
        const products = await productsDal.getProducts();
        res.render('products', { products });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.render('503');
    }
});

module.exports = router;
