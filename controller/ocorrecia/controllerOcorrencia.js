const message = require('../../modulo/config.js')

const ocorrenciaDAO = require('../../model/DAO/ocorrencia.js')
const controllerAluno = require('../alunos/ControllerAluno.js')
const controllerTipoOcorrencia = require('../TipoOcorrencia/ControllerTipoOcorrencia.js')
const controllerGravidade = require('../gravidade/ControllerGravidade.js')

const inserirOcorrencia = async function (ocorrencias,  contentType) {
     
    //datatime
    const data = new Date()
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    const nascimento = `${dia}/${mes}/${ano}`

    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json'){
           if(
            ocorrencias.relato == ''      || ocorrencias.relato == null           || ocorrencias.relato == undefined ||
            ocorrencias.id_tipo == ''     || ocorrencias.id_tipo == undefined     ||
            ocorrencias.id_gravidade == '' || ocorrencias.id_gravidade == undefined 
           ){
            return message.ERROR_REQUIRED_FIELDS
           }else{
             let resultOcorrencia = await ocorrenciaDAO.insertOcorrencia(ocorrencias)

             if(resultOcorrencia)
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

const listaOcorrencia = async function(){
    try {
        let arrayOcorrencia = []
        let dadosOcorrencia = {}
      
        let resultOcorrencia = await ocorrenciaDAO.selectAllOcorrencia()

        if(resultOcorrencia != false || typeof(resultOcorrencia) == 'object'){
            if(resultOcorrencia.length > 0){

                dadosOcorrencia.status = true
                dadosOcorrencia.status_code = 200,
                dadosOcorrencia.itens = resultOcorrencia.length

                for (const itemOcorrencia of resultOcorrencia) {

                let dadosAlunos = await controllerAluno.buscarAlunos(itemOcorrencia.id_aluno)
                let dadosTipo = await controllerTipoOcorrencia.buscarTipo(itemOcorrencia.id_tipo)
                let dadosGravidade = await controllerGravidade.buscarGravidade(itemOcorrencia.id_gravidade)


                itemOcorrencia.alunos = dadosAlunos.alunos
                itemOcorrencia.tipos = dadosTipo.tipos
                itemOcorrencia.Gravidades = dadosGravidade.Gravidades

                
                delete itemOcorrencia.id_aluno
                delete itemOcorrencia.id_tipo
                delete itemOcorrencia.id_gravidade
                arrayOcorrencia.push(itemOcorrencia) 
                
                
                }

                // for (const itemOcorrencia of resultOcorrencia) {

                //     let dadosTipo = await controllerTipoOcorrencia.buscarTipo(itemOcorrencia.id_tipo)
                //     itemOcorrencia.tipos = dadosTipo.tipos
    
                //     delete itemOcorrencia.id_tipo
                //     arrayOcorrencia.push(itemOcorrencia)
    
                // }

                // for (const itemOcorrencia of resultOcorrencia) {
                     
                //     let dadosGravidade = await controllerGravidade.buscarGravidade(itemOcorrencia.id_gravidade)
                //     itemOcorrencia.Gravidades = dadosGravidade.Gravidades

                //     delete itemOcorrencia.id_gravidade
                //     arrayOcorrencia.push(itemOcorrencia)
                // }
                dadosOcorrencia.ocorrencia = arrayOcorrencia

                return dadosOcorrencia
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

const atualizarOcorrencia = async function (id, ocorrencia, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(
                ocorrencia.relato == ''      || ocorrencia.relato == null           || ocorrencia.relato == undefined ||
                ocorrencia.id_aluno == ''    || ocorrencia.id_aluno  == undefined   ||
                ocorrencia.id_tipo == ''     || ocorrencia.id_tipo == undefined     ||
                ocorrencia.id_gravidade == '' || ocorrencia.id_gravidade == undefined 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let result = await ocorrenciaDAO.selectByIdOcorrencia(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {
                        
                        ocorrencia.id = id
                        let resultOcorrencia = await ocorrenciaDAO.updateOcorrencia(ocorrencia)
                        if (resultOcorrencia) {
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

const excluirOcorrencia = async function (id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS // 400
        } else {
            let resultOcorrencia = await ocorrenciaDAO.selectByIdOcorrencia(id)

            if (resultOcorrencia != false || typeof (resultOcorrencia) == 'object') {
                if (resultOcorrencia.length > 0) {
                    // Delete
                    let result = await ocorrenciaDAO.deleteOcorrencia(id)

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

const buscarOcorrencia = async function (id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosOcorrencia = {}

            let resultOcorrencia = await ocorrenciaDAO.selectByIdOcorrencia(id)

            if(resultOcorrencia != false || typeof (resultOcorrencia) == 'object') {
                if (resultOcorrencia.length > 0) {

                    dadosOcorrencia.status = true
                    dadosOcorrencia.status_code = 200
                    dadosOcorrencia.ocorrencias = resultOcorrencia
                    return dadosOcorrencia
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirOcorrencia,
    listaOcorrencia,
    excluirOcorrencia,
    atualizarOcorrencia,
    buscarOcorrencia
}