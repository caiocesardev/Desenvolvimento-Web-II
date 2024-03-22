const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res) {
    res.render("index")
})

app.post("/cadastrar", function(req, res){
    post.create ({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        contato: req.body.contato,
        observacao: req.body.observacao
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Falha ao cadastrar dados: " + erro)
    })
})

app.get("/consultar", function(req, res) {
    res.render("consultar")
})

app.get("/atualizar", function(req, res) {
    res.render("atualizar")
})

app.listen("8081", function(){
    console.log("Servidor Ativo!")
})
