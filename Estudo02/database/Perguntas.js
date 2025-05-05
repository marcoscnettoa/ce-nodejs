const Sequelize = require('sequelize');
const connect   = require('./database');

// ! Cria uma tabela 'perguntas' e os campos atribuídos a ela
const Perguntas  = connect.define('perguntas',{
    titulo:{
        type:Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

// caso a tabela já exista, 'force' = false evita que seja criada, efetua uma verificação
Perguntas.sync({force:false}).then(()=>{});

module.exports = Perguntas;