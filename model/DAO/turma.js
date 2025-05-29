const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const insertTurma = async function(turma){
    try {
        let sql = `insert into tbl_turma (nome,
                                          periodo
                                           )
                                          values(
                                          '${turma.nome}',
                                          '${turma.periodo}'
                                          )`

        let result = await prisma.$executeRawUnsafe (sql)

        if(result)
           return true
        else
         return false
    } catch (error) {
       
        return false
    }
}

const updateTurma = async function (turma){
    try {
        let sql = `update tbl_turma set nome = '${turma.nome}'
        where id = '${turma.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}

const deleteTurma = async function (id){
    try {
        
        let sql = `delete from tbl_turma where id = ${id}`

        result = await prisma.$executeRawUnsafe(sql)
  
        if(result)
            return result
        else 
        return false 
    } catch (error) {
        return false
    }

}

const selectAllTurma = async function (){
    try {
        sql = `select * from tbl_turma order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false 
    }
}

const selectByIdTurma = async function (id){
    try {
        let sql = `select * from tbl_turma where id = ${id}`

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
    insertTurma,
    updateTurma,
    deleteTurma,
    selectAllTurma,
    selectByIdTurma
}

