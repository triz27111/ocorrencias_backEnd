const message = require('../../modulo/config.js')

const turmaDAO = require('../../model/DAO/turma.js')

const inserirTurma = async function (turma, contentType) {
  try {
    if(String(contentType).toLowerCase() == 'application/json'){
        if(
            turma.nome == '' || turma.nome == null || turma.nome == undefined || turma.nome.length > 45 ||  
            turma.periodo == '' || turma.periodo == null || turma.periodo == undefined || turma.periodo.length > 45 
        ){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let resultTurma = await turmaDAO.insertTurma(turma)

            if(resultTurma)
                return message.SUCESS_CREATED_ITEM //201
            else
              return message.ERROR_INTERNAL_SERVER_MODEL //500
        }}else{
            return message.ERROR_CONTENT_TYPE //415
        }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

const atualizarTurma = async function (id, turma, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (turma.nome == '' || turma.nome == null || turma.nome == undefined || turma.nome.length > 100 ||
                turma.periodo == '' || turma.periodo == null || turma.periodo == undefined || turma.periodo.length > 45 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let result = await turmaDAO.selectByIdTurma(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        
                        turma.id = id
                        let resultTurma = await turmaDAO.updateTurma(turma)
                        if (resultTurma) {
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

const excluirTurma = async function (id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultTurma = await turmaDAO.selectByIdTurma(id)

            if (resultTurma != false || typeof (resultTurma) == 'object') {
                if (resultTurma.length > 0) {
                    // Delete
                    let result = await turmaDAO.deleteTurma(id)

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

const listarTurma = async function () {
    try {
        let dadosTurma = {}

        let resultTurma= await turmaDAO.selectAllTurma()

        if (resultTurma != false || typeof (resultTurma) == 'object') {
            if (resultTurma.length > 0) {
                // Cria um json para colocar o array de cargos
                dadosTurma.status = true
                dadosTurma.status_code = 200
                dadosTurma.items = resultTurma.length
                dadosTurma.turmas = resultTurma
                return dadosTurma
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarTurma = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosTurma = {}

            let resultTurma = await turmaDAO.selectByIdTurma(id)

            if (resultTurma != false || typeof (resultTurma) == 'object') {
                if (resultTurma.length > 0) {
                    // Criação do json para o array dos Turma
                    dadosTurma.status = true
                    dadosTurma.status_code = 200
                    dadosTurma.turmas = resultTurma
                    return dadosTurma
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
    inserirTurma,
    atualizarTurma,
    excluirTurma,
    listarTurma,
    buscarTurma
}