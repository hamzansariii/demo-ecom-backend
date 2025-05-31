const express = require('express');
const db = require('../models');
const router = express.Router();


router.get('/products', async (req, res) => {
    try {
        const products = await db.product.findAll({
            include: {
                model: db.variant,
                as: 'variants',
            },
        });

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
