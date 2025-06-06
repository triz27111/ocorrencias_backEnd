// import das bibliotecas para a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Cria um objeto para o body do tipo json 
const bodyParserJSON = bodyParser.json()

// inicializando a utilização do express através da variável app
const app = express()

//Import das Controllers do projeto
const ControllerEducador =  require('./controller/educador/Controllereducador.js')
const ControllerCargo = require('./controller/cargo/controllerCargo.js')
const ControllerAluno = require('./controller/alunos/ControllerAluno.js')
const ControllerTurma = require('./controller/turma/controllerTurma.js')


// request = chegada de dados
// response = saída de dados
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //ativa as configurações do header para o cors 
    app.use(cors(
        {
        origin: 'http://127.0.0.1:5504',
        methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS']
        }
    ))
    app.use(cors(
        {      
        origin: 'http://127.0.0.1:5504',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }


    ))
    next()
})

/////////////////////////// E D U C A D O R ///////////////////////////

app.post('/v1/registro-ocorrencias/educador', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultEducador = await ControllerEducador.inserirEducador(dadosbody, contentType)
    response.status(resultEducador.status_code).json(resultEducador)
})

app.get('/v1/registro-ocorrencias/educador', cors(), async function (request, response) {
    let resultEducador = await ControllerEducador.listarEducador()
    response.status(resultEducador.status_code).json(resultEducador)
})

app.get('/v1/registro-ocorrencias/educador/:id', cors(), async function (request, response) {
    let idEducador = request.params.id
    let resultEducador = await ControllerEducador.buscarEducador(idEducador)
    response.status(resultEducador.status_code).json(resultEducador)
})

app.delete('/v1/registro-ocorrencias/educador/:id', cors(), async function(request, response){
    let idEducador = request.params.id
    let resultEducador = await ControllerEducador.excluirEducador(idEducador)
 
    response.status(resultEducador.status_code)
    response.json(resultEducador)
 
 })

 app.put('/v1/registro-ocorrencias/educador/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idEducador = request.params.id
    let dadosbody = request.body
    let resultEducador = await ControllerEducador.atualizarEducador(idEducador, dadosbody, contentType)
    response.status(resultEducador.status_code).json(resultEducador)
})


/////////////////////////// C A R G O ///////////////////////////

app.post('/v1/registro-ocorrencias/cargo', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultCargo = await ControllerCargo.inserirCargo(dadosbody, contentType)
    response.status(resultCargo.status_code).json(resultCargo)
})

app.get('/v1/registro-ocorrencias/cargo', cors(), bodyParserJSON, async function (request, response) {
    let resultCargo = await ControllerCargo.listarCargo()
    response.status(resultCargo.status_code).json(resultCargo)
})

app.get('/v1/registro-ocorrencias/cargo/:id', cors(), async function (request, response) {
    let idCargo = request.params.id
    let resultCargo = await ControllerCargo.buscarCargo(idCargo)
    response.status(resultCargo.status_code).json(resultCargo)
})

app.delete('/v1/registro-ocorrencias/cargo/:id', cors(), async function(request, response){
   let idCargo = request.params.id


   let resultCargo = await ControllerCargo.excluirCargo(idCargo)

   response.status(resultCargo.status_code)
   response.json(resultCargo)

})

app.put('/v1/registro-ocorrencias/cargo/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idCargo = request.params.id
    let dadosbody = request.body
    let resultCargo = await ControllerCargo.atualizarCargo(idCargo, dadosbody, contentType)
    response.status(resultCargo.status_code).json(resultCargo)
})

/////////////////////////// A L U N O ///////////////////////////


//endpoint para adiconar novos alunos 

app.post('/v1/registro-ocorrencias/alunos', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultAluno = await ControllerAluno.inserirAlunos(dadosbody, contentType)
    response.status(resultAluno.status_code).json(resultAluno)
})

app.get('/v1/registro-ocorrencias/alunos', cors(), bodyParserJSON, async function (request, response) {
    let resultAluno = await ControllerAluno.listarAlunos()
    response.status(resultAluno.status_code).json(resultAluno)
})

app.get('/v1/registro-ocorrencias/alunos/:id', cors(), async function (request, response) {
    let idAluno = request.params.id
    let resultAluno = await ControllerAluno.busarAlunos(idAluno)

    response.status(resultAluno.status_code).json(resultAluno)
})

app.delete('/v1/registro-ocorrencias/alunos/:id', cors(), async function(request, response){
    let idAluno = request.params.id
    let resultAluno = await ControllerAluno.excluirAlunos(idAluno)
 
    response.status(resultAluno.status_code)
    response.json(resultAluno)
 })

 app.put('/v1/registro-ocorrencias/alunos/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idAluno = request.params.id
    let dadosbody = request.body
    let resultAluno = await ControllerAluno.atualizarAlunos(idAluno, dadosbody, contentType)
    response.status(resultAluno.status_code).json(resultAluno)
})

////////////////////////////////////////////// T U R M A ///////////////////////////////////////////////////


app.post('/v1/registro-ocorrencias/turma', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultTurma = await ControllerTurma.inserirTurma(dadosbody, contentType)
    response.status(resultTurma.status_code).json(resultTurma)
})

//Endpoint para listar todos os turma
app.get('/v1/registro-ocorrencias/turma',cors(), bodyParserJSON, async function(request, response){
    let  resultTurma = await ControllerTurma.listarTurma()

    response.status(resultTurma.status_code)
    response.json(resultTurma)
})

//Endpoint para pesquisar pelo ID
app.get('/v1/registro-ocorrencias/turma/:id', cors(), async function(request, response){

    let idTurma = request.params.id

    let resultTurma = await ControllerTurma.buscarTurma(idTurma)

    response.status(resultTurma.status_code)
    response.json(resultTurma)
})

//Endpoint pesquisar e deletar musicas pelo id
app.delete('/v1/registro-ocorrencias/turma/:id', cors(), async function(request, response){
   let idTurma = request.params.id


   let resultTurma = await ControllerTurma.excluirTurma(idTurma)

   response.status(resultTurma.status_code)
   response.json(resultTurma)
})
    
app.put('/v1/registro-ocorrencias/turma/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    let idTurma = request.params.id
    let dadosbody = request.body

    let resultTurma = await ControllerTurma.atualizarTurma(idTurma, dadosbody, contentType)

    response.status(resultTurma.status_code)
    response.json(resultTurma)
})

app.listen( 8080, function(){
    console.log('API funcionando e aguardando requisições..')
})
