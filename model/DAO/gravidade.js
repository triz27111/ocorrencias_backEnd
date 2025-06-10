//import do prisma client
const { PrismaClient } = require("@prisma/client")

//import do prisma
const prisma = new PrismaClient

const insertGravidade = async function(gravidade){
    try {
        let sql = `insert into tbl_gravidade (categorias)
                                             values(
                                                '${gravidade.categorias}'
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

const updateGravidade = async function (gravidade){
    try {
        let sql = `update tbl_gravidade set categorias = '${gravidade.categorias}'
        where id = '${gravidade.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}

const deleteGravidade = async function (id) {
    try {
        
        let sql = `delete from tbl_gravidade where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return result
    else
    return false
    } catch (error) {
   
        return false
    }
    
}

const selectAllGravidade  = async function (){
    try {
        sql = `select * from tbl_gravidade order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false 
    }
}

const selectByIdGravidade = async function (id){
    try {
        let sql = `select * from tbl_gravidade where id = ${id}`

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
   insertGravidade,
   updateGravidade,
   selectAllGravidade,
   selectByIdGravidade,
   deleteGravidade

}
