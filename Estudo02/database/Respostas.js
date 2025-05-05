const Sequelize = require('sequelize');
const connect   = require('./database');

const Respostas  = connect.define('respostas',{
    perguntas_id:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    resposta:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

Respostas.sync({force:false}).then(()=>{});

module.exports = Respostas;