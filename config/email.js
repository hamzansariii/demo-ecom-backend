const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "99247e9c61e1ea",
        pass: "ad44d7fe1b1d97"
    }
});

async function sendApprovedTransactionEmail({ to, orderId, productInfo, customerName }) {
    const info = await transport.sendMail({
        from: '"Shop Support" <no-reply@yourshop.com>',
        to,
        subject: `Order Confirmation - #${orderId}`,
        text: `Hi ${customerName},

Thank you for your purchase!

Order Number: ${orderId}
Product Info: ${productInfo}

Your transaction has been successfully processed.

Regards,
Your Shop Team`,
        html: `
      <p>Hi <strong>${customerName}</strong>,</p>
      <p>Thank you for your purchase!</p>
      <p><strong>Order Number:</strong> ${orderId}<br/>
         <strong>Product Info:</strong> ${productInfo}</p>
      <p>Your transaction has been <strong>successfully processed</strong>.</p>
      <p>Regards,<br/>Your Shop Team</p>
    `
    });

    console.log('✅ Approved transaction email sent:', info.messageId);
}

async function sendDeclinedTransactionEmail({ to, customerName }) {
    const info = await transport.sendMail({
        from: '"Shop Support" <no-reply@yourshop.com>',
        to,
        subject: `Transaction Failed`,
        text: `Hi ${customerName},

Unfortunately, your recent transaction could not be processed.

Please check your payment details and try again. If the issue persists, feel free to contact our support team.

Regards,
Your Shop Team`,
        html: `
      <p>Hi <strong>${customerName}</strong>,</p>
      <p><strong>Unfortunately, your recent transaction could not be processed.</strong></p>
      <p>Please check your payment details and try again. If the issue persists, feel free to contact our support team.</p>
      <p>Regards,<br/>Your Shop Team</p>
    `
    });

    console.log('❌ Declined transaction email sent:', info.messageId);
}

module.exports = {
    transport,
    sendApprovedTransactionEmail,
    sendDeclinedTransactionEmail
};
