function cartController() {
    return {
        cart(req, res) {
            res.render("customers/cart");
        },
        update(req, res) {
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                };
            }
            let cart = req.session.cart;
            console.log(req.body);
            const price = parseFloat(req.body.price);
           

            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                };
                cart.totalQty += 1;
                cart.totalPrice +=  price;
            } else {
                cart.items[req.body._id].qty += 1;
                cart.totalQty += 1;
                cart.totalPrice +=  price;
            }

            res.json({ message: 'Cart updated successfully', cart });
        }
    };
}


module.exports = cartController;


//cart looks like that 
//let cart ={
//     items:{
//         pizzaId:{item:pizzaObject , qty : 0},
//         pizzaId:{item:pizzaObject , qty : 0},
//         pizzaId:{item:pizzaObject , qty : 0},
//     },
//     totalQty:0,
//     totalPrice:0,
// }