const express = require('express');
const ProductModel = require('../model/product.model');
const ProductRouter = express.Router();

ProductRouter.use(express.json());

// Existing route to get a single product by ID
ProductRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await ProductModel.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ 'msg': data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Existing route to get all products with pagination and optional title filtering
ProductRouter.get('/', async (req, res) => {
    const { page, limit, title } = req.query; // Destructure and set default page and limit
    const parsedPage = parseInt(page) ; // Default to page 1
    const parsedLimit = parseInt(limit) ; // Default to 10 items per page

    try {
        const query = title ? { title: { $regex: title, $options: 'i' } } : {};
        const products = await ProductModel.find(query)
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit);
        
        const total = await ProductModel.countDocuments(query);

        res.status(200).json({
            msg: products,
            totalPages: Math.ceil(total / parsedLimit), // Total pages
            currentPage: parsedPage,
            totalItems: total
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// New route to fetch product details based on an array of product IDs
ProductRouter.post('/details', async (req, res) => {
    const { ids } = req.body; // Extract IDs from the request body

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Invalid product IDs' });
    }

    try {
        const products = await ProductModel.find({ _id: { $in: ids } }); // Find products with the specified IDs
        res.status(200).json(products); // Return the found products
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to add a new product
ProductRouter.post('/', async (req, res) => {
    const { title, price, rating, image } = req.body;

    if (!title || !price || !rating || !image) {
        return res.status(400).json({ error: 'All fields are required: title, price, rating, image' });
    }

    try {
        const newProduct = await ProductModel.create({ title, price, rating, image });
        res.status(201).json({ 'msg': newProduct });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = ProductRouter;
