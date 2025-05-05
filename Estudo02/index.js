const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");

const connect     = require('./database/database');
const M_Perguntas = require('./database/Perguntas');
const M_Respostas = require('./database/Respostas');

connect.authenticate()
       .then(()=>{
           console.log('Conexão com o banco de dados foi realizada!');
       })
       .catch((msgError) => {
           console.log('Ocorreu um erro! '+msgError);
       });

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.get('/', function(req, res) {
    M_Perguntas.findAll({ raw:true, order:[['id','DESC']] }).then(perguntas => {
        //console.log(perguntas);
        //console.log(JSON.stringify(perguntas,null,2));
        res.render('index', { perguntas: perguntas });
    }).catch(error => {
        console.log('Ocorreu um erro! '+ error)
    });
    //res.render('index');
});

app.get('/perguntar', function(req, res) {
    res.render('perguntar');
});

app.post('/perguntar/salvar', function(req, res) {
    var titulo    = req.body.titulo;
    var descricao = req.body.descricao;

    M_Perguntas.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
       res.redirect("/");
    });
    //res.send('Formulário recebido! Título: '+titulo+' Descrição: '+descricao);
});

app.get('/perguntar/:id/responder',function(req,res){
    var id = req.params.id;

    M_Perguntas.findOne({
       where: { id: id }
    }).then(pergunta=>{
       if(pergunta != undefined){

           M_Respostas.findAll({
               where: { perguntas_id: id },
               order: [['id','DESC']]
           }).then(respostas=>{
                res.render('responder',{
                    pergunta: pergunta,
                    respostas: respostas
                });
           });

       }else {
           res.redirect("/");
       }
    });

});

app.post('/perguntar/:id/responder',function(req,res){
    var id          = req.params.id;
    var responder   = req.body.responder;

    M_Respostas.create({
        perguntas_id: id,
        resposta: responder
    }).then(()=>{
        res.redirect("/perguntar/"+id+"/responder");
    });

    /*M_Perguntas.update({
       responder: responder
    }).then(()=>{
      res.redirect("/");
    });*/
});

app.listen(8080, function() {
    console.log('Servidor Iniciado!');
});