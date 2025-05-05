const Sequelize     = require('sequelize');

const connect       = new Sequelize('njs_projeto_002','root','', {
   host: 'localhost',
   dialect: 'mysql'
});

module.exports      = connect;