const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

const payment = async (req, res, next) => {

};

const paypalPayment = async (req, res, next) => {

    console.log('CART: ', req.body.cart);
    console.log('TOTAL: ', req.body.total);

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4000/payment/paypal/success",
            "cancel_url": "http://localhost:4000/payment/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Mr Brilli glasses",
                    "sku": "glasses",
                    "price": "99.00",
                    "currency": "EUR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "EUR",
                "total": "99.00"
            },
            "description": "This is the payment description."
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.json(payment.links[i].href);
                }
            }
        }

    });
};

const paymentSuccess = (req, res, next) => {
    res.send('Thank you for your purchase');
};

const paymentCancel = (req, res, next) => res.send('Sorry, the payment was cancelled');

module.exports = { payment, paypalPayment, paymentSuccess, paymentCancel };