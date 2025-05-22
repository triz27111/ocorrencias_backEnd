const { Prisma, PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient


//função para inserir um educador 
const insertEducador = async function(educador){
    try {
        let sql = `insert into tbl_educador (Nome,
                                            Senha,
                                            Email,
                                            palavra_chave,
                                            id_cargo
                                            )
                                            values(
                                                '${educador.Nome}',
                                                '${educador.Senha}',
                                                '${educador.Email}',
                                                '${educador.palavra_chave}',
                                                '${educador.id_cargo}'
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

//função para listar educadores 
const selectAllEducadores = async function(){
    try {
        let sql = `select * from tbl_educador order by id desc`

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
    insertEducador,
    selectAllEducadores
}

