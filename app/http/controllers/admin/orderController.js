const Order = require("../../../models/order");

function adminOrderController() {
    return {
        async index(req, res) {
            try {
                const orders = await Order.find({ status: { $ne: 'completed' } })
                    .sort({ 'createdAt': -1 })
                    .populate('customerId', '-password')
                    .exec();

                if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
                    return res.json(orders);
                } else {
                    return res.render('admin/orders', { orders: orders });
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                return res.status(500).json({ error: 'Failed to fetch orders' });
            }
        }
    };
}

module.exports = adminOrderController;
