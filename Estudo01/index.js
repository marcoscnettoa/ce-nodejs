const express = require('express');
const app     = express();

// configurando outra pasta para os templates* .EJS
//app.set('views',__dirname+'/templates');


// configurando o motor template ---> modelo .EJS*
app.set('view engine','ejs');

// configurando arquivos estáticos para carregamento na pasta /public *
app.use(express.static('public'));

app.get('/', (req,res) => {

    var nome            = "Marcos Netto";
    var lang            = "JavaScript | Node.js";
    var exibirVersao    = false;

    var produtos        = [
        {nome: "Produto 001", preco: 4.50 },
        {nome: "Produto 002", preco: 9 },
        {nome: "Produto 003", preco: 15.99 }
    ];

    res.render("index",{
        nome: nome,
        lang: lang,
        exibirVersao: exibirVersao,
        versao: '1.1',
        produtos: produtos
    });
});

app.listen(8080,() => {
   console.log('Inicializando a aplicação!');
});