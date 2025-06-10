const message = require('../../modulo/config.js')

const alunosDAO = require('../../model/DAO/alunos.js')

const controllerTurma = require('../turma/controllerTurma.js')


const inserirAlunos = async function (alunos, contentType){
    
    //datatime
    const data = new Date()
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    const data_nascimento = `${dia}/${mes}/${ano}`

    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                alunos.nome == '' || alunos.nome == null || alunos.nome == undefined || alunos.nome.length > 100 ||
                alunos.matricula == '' || alunos.matricula == null || alunos.matricula == undefined || alunos.matricula.length > 45 ||
                alunos.data_nascimento == '' || alunos.data_nascimento == null || alunos.data_nascimento == undefined || alunos.data_nascimento.length > 100 ||
                alunos.id_turma == '' || alunos.id_turma == undefined 
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultAluno = await alunosDAO.insertAlunos(alunos)

                if(resultAluno)
                return message.SUCESS_CREATED_ITEM//201

                else
                return message.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        // console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const listarAlunos = async function(){
    try {
        let arrayAluno = []
        let dadosAluno = {}
      
        let resultAluno = await alunosDAO.selectAllAlunos()

        if(resultAluno != false || typeof(resultAluno) == 'object'){
            if(resultAluno.length > 0){

                dadosAluno.status = true
                dadosAluno.status_code = 200,
                dadosAluno.itens = resultAluno.length

                for (const itemAluno  of resultAluno) {

                let dadosTurma = await controllerTurma.buscarTurma(itemAluno.id_turma)

                itemAluno.turmas = dadosTurma.turmas
                
                delete itemAluno.id_turma
                arrayAluno.push(itemAluno)  

                }
                dadosAluno.alunos = arrayAluno

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

const atualizarAlunos = async function (id, alunos, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                alunos.nome == '' || alunos.nome == null || alunos.nome == undefined || alunos.nome.length > 45 ||
                alunos.matricula == '' || alunos.matricula == null || alunos.matricula == undefined || alunos.matricula.length > 45 ||
                alunos.data_nascimento == '' || alunos.data_nascimento == null || alunos.data_nascimento == undefined || alunos.data_nascimento.length > 100 ||
                alunos.id_turma == '' || alunos.id_turma == undefined 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let result = await alunosDAO.selectByIdAlunos(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        
                        alunos.id = id
                        let resultAluno = await alunosDAO.updateAlunos(alunos)
                        if (resultAluno) {
                            return message.SUCESS_UPDATE_ITEM
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500
                        }
                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirAlunos = async function (id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultAluno = await alunosDAO.selectByIdAlunos(id)

            if (resultAluno != false || typeof (resultAluno) == 'object') {
                if (resultAluno.length > 0) {
                    // Delete
                    let result = await alunosDAO.deleteAlunos(id)

                    if (result)
                        return message.SUCESS_DELETE_ITEM // 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarAlunos = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosAlunos = {}

            let resultAluno = await alunosDAO.selectByIdAlunos(id)

            if (resultAluno != false || typeof (resultAluno) == 'object') {
                if (resultAluno.length > 0) {
                    // Criação do json para o array dos Turma
                    dadosAlunos.status = true
                    dadosAlunos.status_code = 200
                    dadosAlunos.alunos = resultAluno
                    return dadosAlunos
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirAlunos,
    listarAlunos,
    atualizarAlunos,
    excluirAlunos,
    buscarAlunos
}