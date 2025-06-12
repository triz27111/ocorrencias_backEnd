const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient

const insertOcorrencia = async function(ocorrencia) {
    try {

        let sql = `insert into tbl_ocorrencia (relato,
                                               id_aluno,
                                               id_tipo,
                                               id_gravidade)
                                               values(
                                               '${ocorrencia.relato}',
                                               '${ocorrencia.id_aluno}',
                                               '${ocorrencia.id_tipo}',
                                               '${ocorrencia.id_gravidade}'
                                               )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
           return false
    
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateOcorrencia = async function(ocorrencia) {
    try {
        let sql = `update tbl_ocorrencia set relato  = '${ocorrencia.relato}',
                                            id_aluno = '${ocorrencia.id_aluno}',
                                            id_tipo  = '${ocorrencia.id_tipo}',
                                            id_gravidade = '${ocorrencia.id_gravidade}'

        where id = '${ocorrencia.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
           return false
    } catch (error) {
        return false
    }
}

const deleteOcorrencia = async function (id) {
    try {
        let sql = `delete from tbl_ocorrencia where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
        return false
    } catch (error) {
        return false
    }
}

const selectAllOcorrencia = async function () {
    try {
        let sql = `select * from tbl_ocorrencia order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)
        console.log('oi')

        if(result)
    
            return result
        else
        return false

    } catch (error) {
        console.error(error)
       return false 
    }
    
}

const selectByIdOcorrencia = async function (id) {
    try {
        let sql = `select * from tbl_ocorrencia where id = ${id}`

        let result = await prisma.$queryRawUnsafe (sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertOcorrencia,
    updateOcorrencia,
    deleteOcorrencia,
    selectAllOcorrencia,
    selectByIdOcorrencia
}