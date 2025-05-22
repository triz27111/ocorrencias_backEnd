//import das bibliotecas para a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Cria um objeto para o body do tipo json 
const bodyParserJSON = bodyParser.json()

//incializando a utilização do express através da variavel app
const app = express()

// request = significa a chegada de dados na api 
// response = saida de dados na api 
// next = 
app.use((request, response, next)=>{
    //permissão de acessi para quem irá criar a API
    response.header('Access-Control-Allow-Origin', '*')
    //permissão de acesso para os metodos da api
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTONS')
    //ativa as configurações do header para o cors 
    app.use(cors())

    next()
})

const ControllerEducador =  require('./controller/educador/Controllereducador.js')
const ControllerCargo =  require('./controller/cargo/controllerCargo.js')

app.post('/v1/registro-ocorrencias/educador',cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
})
