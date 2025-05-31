const express = require('express');
const router = express.Router();
const { order: Order } = require('../models'); // adjust path if needed
const { simulatePayment } = require('../controllers/simulatePayment');
const { sendApprovedTransactionEmail, sendDeclinedTransactionEmail } = require('../config/email');

router.post('/place-order', async (req, res) => {
    try {
        const { customer, cartItems } = req.body;

        if (!customer || !cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        const newOrder = await Order.create({
            orderFullName: customer.fullName,
            orderEmail: customer.email,
            orderPhoneNumber: customer.phone,
            orderAddress: customer.address,
            orderCity: customer.city,
            orderState: customer.state,
            orderZipCode: customer.zip,
            orderStatus: 'pending',
            cartDetail: cartItems
        });
        (async () => {
            await sendApprovedTransactionEmail({
                to: 'hamza.4119007.ex@mhssce.ac.in',
                orderId: '123456',
                productInfo: '1x Coffee Mug, 2x T-Shirts',
                customerName: 'Hamza'
            });
        })();
        const paymentStatus = simulatePayment({
            cardNumber: customer.cardNumber,
            expiryDate: customer.expiry,
            cvv: customer.cvv
        });

        if (paymentStatus.success) {
            await sendApprovedTransactionEmail({
                to: customer.email,
                orderId: newOrder.id,
                productInfo: cartItems.map(item => `${item.productTitle} x${item.quantity}`).join(', '),
                customerName: customer.fullName
            });
            return res.status(201).json({
                message: 'Order placed successfully',
                orderId: newOrder.id
            });
        }
        await sendDeclinedTransactionEmail({
            to: customer.email,
            customerName: customer.fullName
        });
        // Specific error cases
        if (paymentStatus.message.includes('gateway')) {
            return res.status(502).json({ message: paymentStatus.message });
        }

        return res.status(402).json({ message: paymentStatus.message });

    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/order/summary/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        console.log('oid = ', orderId)
        const foundOrder = await Order.findOne({ where: { id: orderId } });
        console.log("Rder = ", foundOrder)

        if (!foundOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        return res.status(200).json({ order: foundOrder });
    } catch (error) {
        console.error('Error fetching order summary:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
