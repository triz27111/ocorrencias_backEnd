const message = require('../../modulo/config.js')

const educadorDAO = require('../../model/DAO/educador.js')

const ControllerCargo = require('../cargo/controllerCargo.js')

const inserirEducador = async function (educador, contentType){

    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                educador.nome == '' || educador.nome == null || educador.nome == undefined || educador.nome.length > 100 ||
                educador.senha == '' || educador.senha == null || educador.senha == undefined || educador.senha.length > 45 ||
                educador.email == '' || educador.email == null || educador.email == undefined || educador.email.length > 100 ||
                educador.palavra_chave == '' || educador.palavra_chave == null || educador.palavra_chave == undefined || educador.palavra_chave.length > 100||
                educador.id_cargo == '' || educador.id_cargo == undefined 
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultEducador = await educadorDAO.insertEducador(educador)

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

const atualizarEducador = async function(id, educador, contentType){
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
        if (educador.nome == '' || educador.nome == null || educador.nome == undefined || educador.nome.length > 100 ||
            educador.senha == '' || educador.senha == null || educador.senha == undefined || educador.senha.length > 45 ||
            educador.email == '' || educador.email == null || educador.email == undefined || educador.email.length > 100 ||
            educador.palavra_chave == '' || educador.palavra_chave == null || educador.palavra_chave == undefined || educador.palavra_chave.length > 100 ||
            educador.id_cargo == '' || educador.id_cargo == null || educador.id_cargo == undefined  ||
            id == null || id == undefined || id == ""  || isNaN(id) 
        ) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            
            let result = await educadorDAO.selectByIdEducador(id)

            if (result != false || typeof (result) == 'object') {
                if (result.length > 0) {
                    
                    educador.id = id
                    let resultEducador = await educadorDAO.updateEducador(educador)
                    if (resultEducador) {
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

const excluirEducador = async function (id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {

            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
           
            let resultEducador = await educadorDAO.selectByIdEducador(id)

            if (resultEducador != false || typeof (resultEducador) == 'object') {
                if (resultEducador.length > 0) {
                    // Delete
                   
                    let result = await educadorDAO.deleteEducador(id)

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

const buscarEducador = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosEducador = {}

            let resultEducador = await educadorDAO.selectByIdEducador(id)
                
            if (resultEducador != false || typeof (resultEducador) == 'object') {
                if (resultEducador.length > 0) {
                    // Criação do json para o array dos cargos 
                    dadosEducador.status = true
                    dadosEducador.status_code = 200
                    dadosEducador.cargos = resultEducador
                    return dadosEducador
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

const listarEducador = async function(){
    try {
        let arrayEducador = []
        let dadosEducador = {}
      
        let resultEducador = await educadorDAO.selectAllEducador()

        if(resultEducador != false || typeof(resultEducador) == 'object'){
            if(resultEducador.length > 0){

                dadosEducador.status = true
                dadosEducador.status_code = 200,
                dadosEducador.itens = resultEducador.length

                for(const itemEducador of resultEducador){
                    let dadosCargo = await ControllerCargo.buscarCargo(itemEducador.id_cargo)

                    itemEducador.cargos = dadosCargo.cargos

                    delete itemEducador.id_cargo

                    arrayEducador.push(itemEducador)
                }
                dadosEducador.educadores = resultEducador
                return dadosEducador
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirEducador,
    listarEducador,
    atualizarEducador,
    excluirEducador,
    buscarEducador

}