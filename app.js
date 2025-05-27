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
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    //ativa as configurações do header para o cors 
    app.use(cors())

    next()
})

const ControllerEducador =  require('./controller/educador/Controllereducador.js')
const ControllerCargo =  require('./controller/cargo/controllerCargo.js')
const ControllerAluno = require('./controller/alunos/ControllerAlunos.js')
const ControllerTurma = require('./controller/turma/controllerTurma.js')

//Endpoint para inserir educadores
app.post('/v1/registro-ocorrencias/educador', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosbody = request.body

    let resultEducador = await ControllerEducador.inserirEducador(dadosbody, contentType)

    response.status(resultEducador.status_code)
    response.json(resultEducador)
})

//Endpoint para listar educadores
app.get('/v1/registro-ocorrencias/educador', cors(), async function(request, response){
    let resultEducador = await ControllerEducador.listarEducador()

    response.status(resultEducador.status_code)
    response.json(resultEducador)
})
////////////////////////////////////////////// C A R G O ///////////////////////////////////////////////////


//Endpoint para inserir um cargo
app.post('/v1/registro-ocorrencias/cargo',cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosbody = request.body

    let resultCargo = await ControllerCargo.inserirCargo(dadosbody, contentType)

    response.status(resultCargo.status_code)
    response.json(resultCargo)
})
//Endpoint para listar todos os cargos
app.get('/v1/registro-ocorrencias/cargo',cors(), bodyParserJSON, async function(request, response){
    let  resultCargo = await ControllerCargo.listarCargo()

    response.status(resultCargo.status_code)
    response.json(resultCargo)
})

//Endpoint para pesquisar pelo ID
app.get('/v1/registro-ocorrencias/cargo/:id', cors(), async function(request, response){

    let idCargo = request.params.id

    let resultCargo = await ControllerCargo.buscarCargo(idCargo)

    response.status(resultCargo.status_code)
    response.json(resultCargo)
})

//Endpoint pesquisar e deletar musicas pelo id
app.delete('/v1/registro-ocorrencias/cargo/:id', cors(), async function(request, response){
   let idCargo = request.params.id
   let resultCargo = await ControllerCargo.excluirCargo(idCargo)

   response.status(resultCargo.status_code)
   response.json(resultCargo)
})
    
app.put('/v1/registro-ocorrencias/cargo/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    let idCargo = request.params.id
    let dadosbody = request.body

    let resultCargo = await ControllerCargo.atualizarCargo(idCargo, dadosbody, contentType)

    response.status(resultCargo.status_code)
    response.json(resultCargo)
})

////////////////////////////////////////////// A L U N O S ///////////////////////////////////////////////////

//endpoint para adiconar novos alunos 
app.post('/v1/registro-ocorrencias/alunos/', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    let dadosbody = request.body

    let resultAluno = await ControllerAluno.inserirAluno(dadosbody, contentType)

    response.status(resultAluno.status_code)
    response.json(resultAluno)
})

app.get('/v1/registro-ocorrencias/alunos', cors(), bodyParserJSON, async function(request, response){

    let resultAluno = await ControllerAluno.listarAluno()

    response.status(resultAluno.status_code)
    response.json(resultAluno)
})

app.post('/v1/registro-ocorrencias/turma', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosbody = request.body

    let resultTurma = await ControllerTurma.inserirTurma(dadosbody, contentType)

    response.status(resultTurma.status_code)
    response.json(resultTurma)
})
app.listen('7070', function(){
    console.log('API funcionando e aguardando requisições..')
})