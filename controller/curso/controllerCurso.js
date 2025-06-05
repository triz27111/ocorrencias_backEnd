//import dos status_codes
const message = require('../../modulo/config.js')

//import da MODEL/DAO
const cursoDAO = require('../../model/DAO/curso.js')

const inserirCurso = async function (cursos, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                cursos.nome == '' || cursos.nome == null || cursos.nome == undefined || cursos.nome.length > 45 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let resultCurso = await cursoDAO.insertCurso(cursos)

                if(resultCurso)
                return message.SUCESS_CREATED_ITEM

                else
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarCurso = async function (id, cursos, contentType){
    try {
        if(String(contentType).toLowerCase() == 'applicsation/json'){
            if(
                cursos.nome == '' || cursos.nome == null || cursos.nome == undefined || cursos.nome.length > 45 
            ){
                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await cursoDAO.selectByIdCurso(id)

                if(result != false || typeof (result) == 'object'){
                    if (result.length > 0){

                        cursos.id = id
                        let resultCurso = await cursoDAO.updateCurso(cursos)
                        if(resultCurso) {
                            return message.SUCESS_UPDATE_ITEM
                        }else{
                            return message.ERROR_NOT_FOUND
                        }
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirCurso = async function (id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {

            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultCurso = await cursoDAO.selectByIdCurso(id)

            if (resultCurso != false || typeof (resultCurso) == 'object') {
                if (resultCurso.length > 0) {
                    // Delete
                    let result = await cursoDAO.deleteCurso(id)

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

const buscarCurso= async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosCurso = {}

            let resultCurso = await cursoDAO.selectByIdCurso(id)

            if (resultCurso != false || typeof (resultCurso) == 'object') {
                if (resultCurso.length > 0) {
                    dadosCurso.status = true
                    dadosCurso.status_code = 200
                    dadosCurso.cargos = resultCurso
                    return dadosCurso
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

const listarCurso = async function () {
    try {
        let dadosCurso = {}

        let resultCurso = await cursoDAO.selectAllCurso()

        if (resultCurso != false || typeof (resultCurso) == 'object') {
            if (resultCurso.length > 0) {
                
                dadosCurso.status = true
                dadosCurso.status_code = 200
                dadosCurso.items = resultCurso.length
                dadosCurso.cargos = resultCurso
                return dadosCurso
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

module.exports = {
    inserirCurso,
    atualizarCurso,
    excluirCurso,
    buscarCurso,
    listarCurso
}