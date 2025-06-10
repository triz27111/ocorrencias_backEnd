const message = require('../../modulo/config.js')

const GravidadeDAO = require('../../model/DAO/gravidade.js')

//função para inserir um Gravidade
const inserirGravidade = async function(Gravidade, contentType){
    
  try {
    if(String(contentType).toLowerCase() == 'application/json'){
        
        if(Gravidade.nome == '' || Gravidade.nome == null || Gravidade.nome == undefined || Gravidade.nome.length > 45
        
        ){
            return message.ERROR_REQUIRED_FIELDS
            
        }else{
            let resultGravidade = await GravidadeDAO.insertGravidade(Gravidade)

            if(resultGravidade)
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

//função para atualizar um Gravidade
const atualizarGravidade = async function (id, Gravidade, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (Gravidade.nome == '' || Gravidade.nome == null || Gravidade.nome == undefined || Gravidade.nome.length > 100 ||
                id == '' || id == null || id == undefined || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let result = await GravidadeDAO.selectByIdGravidade(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        
                        Gravidade.id = id
                        let resultGravidade = await GravidadeDAO.updateGravidade(Gravidade)
                        if (resultGravidade) {
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

// Função para deletar um Gravidade 
const excluirGravidade = async function (id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            console.log(id)

            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            console.log(id)
            let resultGravidade = await GravidadeDAO.selectByIdGravidade(id)

            if (resultGravidade != false || typeof (resultGravidade) == 'object') {
                if (resultGravidade.length > 0) {
                    // Delete
                    console.log(id)
                    let result = await GravidadeDAO.deleteGravidade(id)

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

// Função para listar todos os Gravidades
const listarGravidade = async function () {
    try {
        let dadosGravidade = {}

        let resultGravidade = await GravidadeDAO.selectAllGravidade()

        if (resultGravidade != false || typeof (resultGravidade) == 'object') {
            if (resultGravidade.length > 0) {
                // Cria um json para colocar o array de Gravidades
                dadosGravidade.status = true
                dadosGravidade.status_code = 200
                dadosGravidade.items = resultGravidade.length
                dadosGravidade.Gravidades = resultGravidade
                return dadosGravidade
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

// Função para buscar um Gravidade pelo ID 
const buscarGravidade = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosGravidade = {}

            let resultGravidade = await GravidadeDAO.selectByIdGravidade(id)

            if (resultGravidade != false || typeof (resultGravidade) == 'object') {
                if (resultGravidade.length > 0) {
                    // Criação do json para o array dos Gravidades 
                    dadosGravidade.status = true
                    dadosGravidade.status_code = 200
                    dadosGravidade.Gravidades = resultGravidade
                    return dadosGravidade
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
    inserirGravidade,
    atualizarGravidade,
    excluirGravidade,
    listarGravidade,
    buscarGravidade
}