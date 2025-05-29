// import das bibliotecas para a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Cria um objeto para o body do tipo json 
const bodyParserJSON = bodyParser.json()

// inicializando a utilização do express através da variável app
const app = express()

// request = chegada de dados
// response = saída de dados
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors({      
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}

    ))
    next()
})

const ControllerEducador = require('./controller/educador/Controllereducador.js')
const ControllerCargo = require('./controller/cargo/controllerCargo.js')
const ControllerAluno = require('./controller/alunos/ControllerAlunos.js')
const ControllerTurma = require('./controller/turma/controllerTurma.js')

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

app.delete('/v1/registro-ocorrencias/cargo/:id', cors(), async function (request, response) {
    let idCargo = request.params.id
    let resultCargo = await ControllerCargo.excluirCargo(idCargo)
    response.status(resultCargo.status_code).json(resultCargo)
})

app.put('/v1/registro-ocorrencias/cargo/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idCargo = request.params.id
    let dadosbody = request.body
    let resultCargo = await ControllerCargo.atualizarCargo(idCargo, dadosbody, contentType)
    response.status(resultCargo.status_code).json(resultCargo)
})

/////////////////////////// A L U N O ///////////////////////////

app.post('/v1/registro-ocorrencias/alunos', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultAluno = await ControllerAluno.inserirAluno(dadosbody, contentType)
    response.status(resultAluno.status_code).json(resultAluno)
})

app.get('/v1/registro-ocorrencias/alunos', cors(), bodyParserJSON, async function (request, response) {
    let resultAluno = await ControllerAluno.listarAluno()
    response.status(resultAluno.status_code).json(resultAluno)
})

/////////////////////////// T U R M A ///////////////////////////

app.post('/v1/registro-ocorrencias/turma', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultTurma = await ControllerTurma.inserirTurma(dadosbody, contentType)
    response.status(resultTurma.status_code).json(resultTurma)
})

/////////////////////////// S E R V I D O R ///////////////////////////

app.listen('8080', function () {
    console.log('API funcionando e aguardando requisições...')
})
