const message = require('../../modulo/config.js')

const alunosDAO = require('../../model/DAO/alunos.js')

const controllerTurma = require('../../controller/turma/controllerTurma.js')


const inserirAluno = async function (alunos, contentType){

    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                alunos.nome == '' || alunos.nome == null || alunos.nome == undefined || alunos.nome.length > 45 ||
                alunos.senha == '' || alunos.senha == null || alunos.senha == undefined || alunos.senha.length > 45 ||
                alunos.email == '' || alunos.email == null || alunos.email == undefined || alunos.email.length > 45 ||
                alunos.palavra_chave == '' || alunos.palavra_chave == null || alunos.palavra_chave == undefined || alunos.palavra_chave.length > 100 ||
                alunos.id_cargo == '' || alunos.id_cargo == undefined 
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultEducador = await alunosDAO.insertEducador(alunos)

                if(resultEducador)
                return message.SUCESS_CREATED_ITEM//201

                else
                return message.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const listarAluno = async function(){
    try {
        //let arrayAluno = []
        let dadosAluno = {}
      
        let resultAluno = await alunosDAO.selectAllAlunos()

        if(resultAluno != false || typeof(resultAluno) == 'object'){
            if(resultAluno.length > 0){

                dadosAluno.status = true
                dadosAluno.status_code = 200,
                dadosAluno.itens = resultAluno.length

                for (const itemAluno  of resultAluno) {

                    let dadosTurma = await controllerTurma.listarTurma(itemAluno.id_turma)

                itemAluno.turma = dadosTurma.turma
                
                delete itemAluno.id_turma
                arrayAlunos.push(itemAluno)  
                }
                dadosAluno.turma = arrayAlunos

                dadosAluno.cargos = resultAluno
                
                return dadosAluno
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirAluno,
    listarAluno
}