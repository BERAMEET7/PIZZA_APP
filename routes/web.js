const homeControllers = require('../app/http/controllers/homeControllers');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/cartController');

function initRoutes(app) {

    app.get("/",homeControllers().index)

    app.get("/cart",cartController().cart)
    app.post("/update-cart",cartController().update)

    app.get("/login", authController().login)

    app.get("/register", authController().register)
}

module.exports = initRoutes