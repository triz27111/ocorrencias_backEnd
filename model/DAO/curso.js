//import do prisma client
const { PrismaClient } = require("@prisma/client")

//import do prisma
const prisma = new PrismaClient

const insertCurso = async function(curso){
    try {
        let sql = `insert into tbl_curso (nome)
                                             values(
                                                '${curso.nome}'
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

const updateCurso = async function (curso){
    try {
        let sql = `update tbl_curso set nome = '${curso.nome}'
        where id = '${curso.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}

const deleteCurso = async function (id) {
    try {
        
        let sql = `delete from tbl_curso where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return result
    else
    return false
    } catch (error) {
   
        return false
    }
    
}

const selectAllCurso  = async function (){
    try {
        sql = `select * from tbl_curso order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false 
    }
}

const selectByIdCurso = async function (id){
    try {
        let sql = `select * from tbl_curso where id = ${id}`

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
    insertCurso,
    updateCurso,
    deleteCurso,
    selectAllCurso,
    selectByIdCurso 
}
