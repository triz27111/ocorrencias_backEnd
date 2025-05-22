const message = require('../../modulo/config.js')

const educadorDAO = require('../../model/DAO/educador.js')

const ControllerCargo = require('../cargo/controllerCargo.js')

const inserirEducador = async function (educador, contentType){

    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                educador.nome == '' || educador.nome == null || educador.nome == undefined || educador.nome.length > 45 ||
                educador.senha == '' || educador.senha == null || educador.senha == undefined || educador.senha.length > 45 ||
                educador.email == '' || educador.email == null || educador.email == undefined || educador.email.length > 45 ||
                educador.palavra_chave == '' || educador.palavra_chave == null || educador.palavra_chave == undefined || educador.palavra_chave.length > 100 ||
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

const listarEducador = async function(){
    try {
        let arrayEducador = []
        let dadosEducador = {}
      
        let resultEducador = await educadorDAO.selectAllEducadores()

        if(resultEducador != false || typeof(resultEducador) == 'object'){
            if(resultEducador.length > 0){

                dadosEducador.status = true
                dadosEducador.status_code = 200,
                dadosEducador.itens = resultEducador.length

                for(const itemEducador of resultEducador){
                    let dadosCargo = await ControllerCargo.buscarCargo(itemEducador.id_cargo)

                    itemEducador.cargo = dadosCargo.cargo

                    delete itemEducador.id_cargo

                    arrayEducador.push(itemEducador)
                }
                dadosEducador.cargos = resultEducador
                return dadosEducador
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
    inserirEducador,
    listarEducador
}