const express = require('express');
const router = express.Router();
require('dotenv').config();

const { authenticate } = require('../middleware/checkAuthentication'); // JWT verification middleware
const Cart = require('../model/cart.model');
const ProductModel = require('../model/product.model');

// Get Cart by User ID
router.get('/', authenticate, async (req, res) => {
    const userId = req.body.userId; // Extract userId from the request after authentication
    console.log(userId);
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ items: cart.items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Item to Cart
router.post('/add', authenticate, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.body.userId });
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (cart) {
            // Check if item already exists in cart
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if (itemIndex > -1) {
                // Update quantity if item exists
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                cart.items.push({ productId, quantity });
            }
        } else {
            // Create a new cart if none exists
            const newCart = new Cart({
                userId: req.body.userId,
                items: [{ productId, quantity }]
            });
            await newCart.save();
            return res.status(201).json(newCart);
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Bulk Add Items to Cart
router.post('/add/bulk', authenticate, async (req, res) => {
    const items = req.body.items; // Expecting an array of items in the request body

    try {
        const cart = await Cart.findOne({ userId: req.body.userId }) || new Cart({ userId: req.body.userId, items: [] });

        // Process each item
        for (const { productId, quantity } of items) {
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product ${productId} not found` });
            }

            const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        return res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove Item from Cart
router.post('/remove', authenticate, async (req, res) => {
    const { productId, userId } = req.body; // Make sure userId is also included
    console.log('Request Body:', req.body); // Debugging

    try {
        const cart = await Cart.findOne( req.body.userId );
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.equals(mongoose.Types.ObjectId(productId))); // Ensure to convert productId
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.json(cart);
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: err.message });
    }
});
// Bulk Update Item Quantities in the Cart
router.post('/update/bulk', authenticate, async (req, res) => {
    const items = req.body.items; // Expecting an array of objects with productId and quantity

    try {
        const cart = await Cart.findOne({ userId: req.body.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        items.forEach(({ productId, quantity }) => {
            const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity = quantity; // Update quantity
            }
        });

        await cart.save();
        return res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
