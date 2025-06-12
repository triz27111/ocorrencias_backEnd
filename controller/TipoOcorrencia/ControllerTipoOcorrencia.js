const message = require('../../modulo/config.js')

const TiposDAO = require('../../model/DAO/tipos_ocorrencia.js')

//função para inserir um tipo_ocorrencia
const inserirTipos = async function(tipo_ocorrencia, contentType){
    
  try {
    if(String(contentType).toLowerCase() == 'application/json'){
        
        if(tipo_ocorrencia.tipo == '' || tipo_ocorrencia.tipo == null || tipo_ocorrencia.tipo == undefined || tipo_ocorrencia.tipo.length > 45
        
        ){
            return message.ERROR_REQUIRED_FIELDS
            
        }else{
            let resultTipos = await TiposDAO.insertTipo(tipo_ocorrencia)

            if(resultTipos)
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

//função para atualizar um tipo_ocorrencia
const atualizarTipos = async function (id, tipo_ocorrencia, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (tipo_ocorrencia.tipo == '' || tipo_ocorrencia.tipo == null || tipo_ocorrencia.tipo == undefined || tipo_ocorrencia.tipo.length > 45 ||
                id == '' || id == null || id == undefined || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let result = await TiposDAO.selectByIdTipo(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        
                        tipo_ocorrencia.id = id
                        let resultTipos = await TiposDAO.updateTipo(tipo_ocorrencia)
                        if (resultTipos) {
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

// Função para deletar um tipo_ocorrencia 
const excluirTipo = async function (id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            console.log(id)

            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            console.log(id)
            let resultTipo = await TiposDAO.selectByIdTipo(id)

            if (resultTipo != false || typeof (resultTipo) == 'object') {
                if (resultTipo.length > 0) {
                    // Delete
                    console.log(id)
                    let result = await TiposDAO.deleteTipo(id)

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
const listarTipo = async function () {
    try {
        let dadosTipo = {}

        let resultTipo = await TiposDAO.selectAllTipo()

        if (resultTipo != false || typeof (resultTipo) == 'object') {
            if (resultTipo.length > 0) {
                // Cria um json para colocar o array de cargos
                dadosTipo.status = true
                dadosTipo.status_code = 200
                dadosTipo.items = resultTipo.length
                dadosTipo.tipos = resultTipo
                return dadosTipo
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

// Função para buscar um tipo_ocorrencia pelo ID 
const buscarTipo = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosTipo = {}

            let resultTipo = await TiposDAO.selectByIdTipo(id)

            if (resultTipo != false || typeof (resultTipo) == 'object') {
                if (resultTipo.length > 0) {
                    // Criação do json para o array dos cargos 
                    dadosTipo.status = true
                    dadosTipo.status_code = 200
                    dadosTipo.tipos = resultTipo
                    return dadosTipo
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
    inserirTipos,
    atualizarTipos,
    listarTipo,
    buscarTipo,
    excluirTipo
}