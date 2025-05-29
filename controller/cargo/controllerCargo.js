const message = require('../../modulo/config.js')

const cargoDAO = require('../../model/DAO/cargo.js')

//função para inserir um cargo
const inserirCargo = async function(cargo, contentType){
    
  try {
    if(String(contentType).toLowerCase() == 'application/json'){
        
        if(cargo.nome == '' || cargo.nome == null || cargo.nome == undefined || cargo.nome.length > 45
        
        ){
            return message.ERROR_REQUIRED_FIELDS
            
        }else{
            let resultCargo = await cargoDAO.insertCargo(cargo)

            if(resultCargo)
               return message.SUCESS_CREATED_ITEM //201
            else
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }}else{
            return message.ERROR_CONTENT_TYPE
        }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }
}

//função para atualizar um cargo
const atualizarCargo = async function (id, cargo, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (cargo.nome == '' || cargo.nome == null || cargo.nome == undefined || cargo.nome.length > 100 ||
                id == '' || id == null || id == undefined || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let result = await cargoDAO.selectByIdCargo(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        
                        cargo.id = id
                        let resultCargo = await cargoDAO.updateCargo(cargo)
                        if (resultCargo) {
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

// Função para deletar um cargo 
const excluirCargo = async function (id) {
    try {
        console.log(id)
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            
            let resultCargo = await cargoDAO.selectByIdCargo(id)

            if (resultCargo != false || typeof (resultCargo) == 'object') {
                if (resultCargo.length > 0) {
                    // Delete
                    let result = await cargoDAO.deleteCargo(id)

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

// Função para listar todos os cargos
const listarCargo = async function () {
    try {
        let dadosCargo = {}

        let resultCargo = await cargoDAO.selectAllCargo()

        if (resultCargo != false || typeof (resultCargo) == 'object') {
            if (resultCargo.length > 0) {
                // Cria um json para colocar o array de cargos
                dadosCargo.status = true
                dadosCargo.status_code = 200
                dadosCargo.items = resultCargo.length
                dadosCargo.cargos = resultCargo
                return dadosCargo
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

// Função para buscar um cargo pelo ID 
const buscarCargo = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosCargo = {}

            let resultCargo = await cargoDAO.selectByIdCargo(id)

            if (resultCargo != false || typeof (resultCargo) == 'object') {
                if (resultCargo.length > 0) {
                    // Criação do json para o array dos cargos 
                    dadosCargo.status = true
                    dadosCargo.status_code = 200
                    dadosCargo.cargos = resultCargo
                    return dadosCargo
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
    inserirCargo,
    atualizarCargo,
    excluirCargo,
    listarCargo,
    buscarCargo
}