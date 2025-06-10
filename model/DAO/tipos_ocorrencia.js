//import do prisma client
const { PrismaClient } = require("@prisma/client")

//import do prisma
const prisma = new PrismaClient

const insertTipo = async function(tipo_ocorrencia){
    try {
        let sql = `insert into tbl_tipo_ocorrencia (tipo)
                                             values(
                                                '${tipo_ocorrencia.tipo}'
                                             )`
                    
        let result = await prisma.$executeRawUnsafe(sql)

     if(result)
        return true
     else
     return false

    } catch (error) {
        return false
    }
}

const updateTipo = async function (tipo_ocorrencia){
    try {
        let sql = `update tbl_tipo_ocorrencia set tipo = '${tipo_ocorrencia.tipo}'
        where id = '${tipo_ocorrencia.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}

const deleteTipo = async function (id) {
    try {
        
        let sql = `delete from tbl_tipo_ocorrencia where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return result
    else
    return false
    } catch (error) {
   
        return false
    }
    
}

const selectAllTipo  = async function (){
    try {
        sql = `select * from tbl_tipo_ocorrencia order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false 
    }
}

const selectByIdTipo = async function (id){
    try {
        let sql = `select * from tbl_tipo_ocorrencia where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
          return false

    } catch (error) {
        return false 
    }
}


module.exports = {
    insertTipo,
    updateTipo,
    selectAllTipo,
    selectByIdTipo,
    deleteTipo
}
