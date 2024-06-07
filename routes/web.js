const homeControllers = require('../app/http/controllers/homeControllers');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/cartController');
const orderController = require('../app/http/controllers/orderController');
const adminOrderController = require('../app/http/controllers/admin/orderController');


//middlewares
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');


function initRoutes(app) {

    app.get("/",homeControllers().index)

    app.get("/cart",cartController().cart)
    app.post("/update-cart",cartController().update)

    app.get("/login",guest, authController().login)
    app.post("/login",authController().postLogin)

    app.get("/register",guest, authController().register)
    app.post("/register", authController().postRegister)
    app.post("/logout", authController().logout)

    
    //customer routes
    app.get('/customer/orders',auth ,orderController().index)
    app.post('/orders',auth,orderController().store)

    //admin routes
    app.get('/admin/orders',admin, adminOrderController().index)
}

module.exports = initRoutes