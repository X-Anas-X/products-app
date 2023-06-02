import {connectDB} from './db';
import express from 'express';
import {Product} from './Products/schema';

const app = express();
app.use(express.json());

// Create a new product
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a product by ID
app.patch('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

connectDB(app);
