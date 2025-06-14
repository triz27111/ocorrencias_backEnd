const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()


//função para inserir um alunos 
const insertAlunos = async function(alunos){
    try {
        
        let sql = `insert into tbl_alunos (nome,
                                            matricula,
                                            data_nascimento,
                                            id_turma
                                            )
                                            values(
                                                '${alunos.nome}',
                                                '${alunos.matricula}',
                                                '${alunos.data_nascimento}',
                                                '${alunos.id_turma}'
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

const updateAlunos = async function (alunos){
    try {
        let sql = `update tbl_alunos set nome = '${alunos.nome}',
                                        matricula = '${alunos.matricula}',
                                        data_nascimento = '${alunos.data_nascimento}'
        where id = '${alunos.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}

const deleteAlunos = async function (id) {
    try {
        
        let sql = `delete from tbl_alunos where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return result
    else
    return false
    } catch (error) {
   
        return false
    }
    
}

//função para listar Alunos 
const selectAllAlunos = async function(){
    try {
        let sql = `select * from tbl_alunos order by id desc`

         let result = await prisma.$queryRawUnsafe(sql)

         if(result)
            return result
         else
            return false

    } catch (error) {

        return false
    }
}

const selectByIdAlunos = async function (id){
    try {
        let sql = `select * from tbl_alunos where id = ${id}`

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
   insertAlunos,
   selectAllAlunos,
   updateAlunos,
   deleteAlunos,
   selectByIdAlunos
}

