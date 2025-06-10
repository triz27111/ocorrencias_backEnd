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
const ControllerOcorrencia = require('./controller/ocorrecia/controllerOcorrencia.js')
const ControllerTipo = require('./controller/TipoOcorrencia/ControllerTipoOcorrencia.js')
const controllerGravidade = require('./controller/gravidade/ControllerGravidade.js')


// request = chegada de dados
// response = saída de dados
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //ativa as configurações do header para o cors 
    app.use(cors(
        {
        origin: 'http://10.107.134.29:5504',
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
    let resultAluno = await ControllerAluno.buscarAlunos(idAluno)

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

////////////////////////////////////////////// O C O R R E N C I A ///////////////////////////////////////////////////

app.post('/v1/registro-ocorrencias/ocorrencia', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultOcorrencia = await ControllerOcorrencia.inserirOcorrencia(dadosbody, contentType)
    response.status(resultOcorrencia.status_code).json(resultOcorrencia)
})

app.get('/v1/registro-ocorrencias/ocorrencia',cors(), bodyParserJSON, async function(request, response){
    let  resultOcorrencia = await ControllerOcorrencia.listaOcorrencia()

    response.status(resultOcorrencia.status_code)
    response.json(resultOcorrencia)
})

app.get('/v1/registro-ocorrencias/ocorrencia/:id', cors(), async function (request, response) {
    let idOcorrencia = request.params.id
    let resultOcorrencia = await ControllerOcorrencia.buscarOcorrencia(idOcorrencia)

    response.status(resultOcorrencia.status_code).json(resultOcorrencia)
})

app.delete('/v1/registro-ocorrencias/ocorrencia/:id', cors(), async function(request, response){
    let idOcorrencia = request.params.id
    let resultOcorrencia = await ControllerOcorrencia.excluirOcorrencia(idOcorrencia)
 
    response.status(resultOcorrencia.status_code)
    response.json(resultOcorrencia)
 })

app.put('/v1/registro-ocorrencias/ocorrencia/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idOcorrencia = request.params.id
    let dadosbody = request.body
    let resultOcorrencia = await ControllerOcorrencia.atualizarOcorrencia(idOcorrencia, dadosbody, contentType)
    response.status(resultOcorrencia.status_code).json(resultOcorrencia)
})

////////////////////////////////////////////// T I P O S  D E  O C O R R E N C I A ///////////////////////////////////////////////////

app.post('/v1/registro-ocorrencias/tipo', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultTipo = await ControllerTipo.inserirTipos(dadosbody, contentType)
    response.status(resultTipo.status_code).json(resultTipo)
})

app.get('/v1/registro-ocorrencias/tipo',cors(), bodyParserJSON, async function(request, response){
    let  resultTipo = await ControllerTipo.listarTipo()

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

app.get('/v1/registro-ocorrencias/tipo/:id',cors(), bodyParserJSON, async function(request, response){
   let idTipo = request.params.id
   let resultTipo = await ControllerTipo.buscarTipo(idTipo)

   response.status(resultTipo.status_code).json(resultTipo)
})

app.delete('/v1/registro-ocorrencias/tipo/:id', cors(), async function(request, response){
    let idTipo = request.params.id
    let resultTipo = await ControllerTipo.excluirTipo(idTipo)
 
    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

app.put('/v1/registro-ocorrencias/tipo/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idTipo = request.params.id
    let dadosbody = request.body
    let resultTipo = await ControllerTipo.atualizarTipos(idTipo, dadosbody, contentType)
    response.status(resultTipo.status_code).json(resultTipo)
})

////////////////////////////////////////////// G R A V I D A D E ///////////////////////////////////////////////////

app.post('/v1/registro-ocorrencias/gravidade', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let dadosbody = request.body
    let resultGravidade = await controllerGravidade.inserirGravidade(dadosbody, contentType)
    response.status(resultGravidade.status_code).json(resultGravidade)
})

app.get('/v1/registro-ocorrencias/gravidade',cors(), bodyParserJSON, async function(request, response){
    let  resultGravidade = await controllerGravidade.listarGravidade()

    response.status(resultGravidade.status_code)
    response.json(resultGravidade)
})

app.get('/v1/registro-ocorrencias/gravidade/:id', cors(), async function (request, response) {
    let idGravidade = request.params.id
    let resultGravidade = await controllerGravidade.buscarGravidade(idGravidade)

    response.status(resultGravidade.status_code).json(resultGravidade)
})

app.delete('/v1/registro-ocorrencias/gravidade/:id', cors(), async function(request, response){
    let idGravidade = request.params.id
    let resultGravidade = await controllerGravidade.excluirGravidade(idGravidade)
 
    response.status(resultGravidade.status_code)
    response.json(resultGravidade)
})

app.put('/v1/registro-ocorrencias/gravidade/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let idGravidade = request.params.id
    let dadosbody = request.body
    let resultGravidade = await controllerGravidade.atualizarGravidade(idGravidade, dadosbody, contentType)
    response.status(resultGravidade.status_code).json(resultGravidade)
})




app.listen( 8080, function(){
    console.log('API funcionando e aguardando requisições..')
})
