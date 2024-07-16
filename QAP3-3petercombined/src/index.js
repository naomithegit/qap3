const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = 5432;


global.DEBUG = true;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for MiddleEarth
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const productsDal = require('./services/pg.products.dal');
const productsRoutes = require('./routes/productsRoutes');

// GET all products
app.use('/products', productsRoutes);

// Render home page
app.get('/', async (req, res) => {
res.render('index');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
