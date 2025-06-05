//npx prisma init -  conectar com o banco sql
//npx prisma generate - Serve para gerar os arquivos do Prisma Client com base no seu schema.prisma
//npx prisma migrate migrate dev - Cria e aplica migrações no banco de dados durante o desenvolvimento.


const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const insertTurma = async function(turma){
    try {
        let sql = `insert into tbl_turma (nome,
                                          periodo,
                                          curso,
                                          max_alunos)
                                          values(
                                          '${turma.nome}',
                                          '${turma.periodo}',
                                          '${turma.curso}',
                                          ${turma.max_alunos}
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

        let result = await prisma.$executeRawUnsafe(sql)
  
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

