const Menu = require('../../models/menu')

function homeControllers(){
    return{
        async index(req,res){
            await Menu.find()
            .then(function(pizzas){
                return res.render('home',{ pizzas :pizzas });
            })
        }
    }
}

module.exports = homeControllers