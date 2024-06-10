const Order = require('../../models/order');
const moment = require('moment');

function orderController() {
    return {
        async store(req, res) {
            const { phone, address } = req.body;

            if (!phone || !address) {
                req.flash('error', 'All fields are required');
                return res.redirect('/cart');
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            });

            try {
                const result = await order.save();
                const populatedOrder = await Order.populate(result, { path: 'customerId' });
                console.log(populatedOrder);
                req.flash('success', 'Order placed successfully');
                delete req.session.cart;

                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderPlaced', populatedOrder);

                return res.redirect('/customer/orders');
            } catch (err) {
                req.flash('error', 'Something went wrong');
                return res.redirect('/cart');
            }
        },

        async index(req, res) {
            try {
                const orders = await Order.find({ customerId: req.user._id });
                res.render('customers/orders', { orders: orders, moment: moment });
                console.log(orders);
            } catch (err) {
                console.error('Error fetching orders:', err);
                req.flash('error', 'Failed to fetch orders');
                res.redirect('/');
            }
        },

        async show(req, res) {
            try {
                const order = await Order.findById(req.params.id);
                console.log(order);

                // Authorize the user
                if (req.user._id.toString() === order.customerId.toString()) {
                    return res.render('customers/singleOrder', { order });
                }
                return res.redirect('/');
            } catch (err) {
                console.error('Error fetching order:', err);
                req.flash('error', 'Failed to fetch order');
                res.redirect('/');
            }
        }
    };
}

module.exports = orderController;
