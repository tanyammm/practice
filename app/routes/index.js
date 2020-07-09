const noteRoutes = require('./routes');
module.exports = function(app, db) {   //экспорт функции из routes.js 
    noteRoutes(app, db); //обаботчик маршрутa
};