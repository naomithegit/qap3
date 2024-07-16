const pool = require('./db');

// Get all products
const getProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM products;";
        pool.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching products:', err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

// Get product by ID
const getProductById = (productId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM products WHERE productid = $1;";
        pool.query(sql, [productId], (err, result) => {
            if (err) {
                console.error('Error fetching product by ID:', err);
                reject(err);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

// Add a new product
const addProduct = (productName, productDescription, productPrice, stockQuantity) => {
    console.log(`Add product: POST Request`);

    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO products (productname, productdescription, productprice, stockquantity) VALUES ($1, $2, $3, $4);";
        const values = [productName, productDescription, productPrice, stockQuantity];
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding product:', err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

// Update a product
const updateProduct = (productId, productName, productDescription, productPrice, stockQuantity) => {
    console.log(`Update product: PUT Request`)
    console.log(`postman req data: ${productId}, ${productName}, ${productDescription}, ${productPrice}, ${stockQuantity}`)
    return new Promise((resolve, reject) => {
        const sql = "UPDATE products SET productname = $2, productdescription = $3, productprice = $4, stockquantity = $5 WHERE productid = $1;";
        const values = [productId, productName, productDescription, productPrice, stockQuantity];
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating product:', err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

// Delete a product
const deleteProduct = (productId) => {
    
    
    console.log(`pid: ${productId}, ${typeof productId}`)
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM products WHERE productid = $1;";
        pool.query(sql, [productId], (err, result) => {
            if (err) {
                console.error('Error deleting product:', err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
