// Simulates a payment gateway response based on test card data
function simulatePayment({ cardNumber, expiryDate, cvv }) {
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    const isValidExpiry = expiryPattern.test(expiryDate);
    const isValidCVV = cvvPattern.test(cvv);

    if (!isValidExpiry || !isValidCVV) {
        return {
            success: false,
            message: "Invalid expiry date or CVV",
        };
    }

    // Handle manual test inputs
    switch (cardNumber) {
        case "1":
            return {
                success: true,
                message: "Payment successful",
                transactionId: `TXN${Date.now()}`,
            };
        case "2":
            return {
                success: false,
                message: "Transaction declined by bank",
            };
        case "3":
            return {
                success: false,
                message: "Payment gateway error. Please try again later.",
            };
    }

    // Valid 16-digit card number leads to success
    if (/^\d{16}$/.test(cardNumber)) {
        return {
            success: true,
            message: "Payment successful",
            transactionId: `TXN${Date.now()}`,
        };
    }

    return {
        success: false,
        message: "Transaction declined",
    };
}

module.exports = { simulatePayment };
