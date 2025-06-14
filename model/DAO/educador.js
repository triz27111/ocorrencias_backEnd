const { PrismaClient } = require("@prisma/client")
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
                                                '${educador.nome}',
                                                '${educador.senha}',
                                                '${educador.email}',
                                                '${educador.palavra_chave}',
                                                '${educador.id_cargo}'
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

const updateEducador = async function (educador){
    try {
        let sql = `update tbl_educador set nome =    '${educador.nome}',
                                           senha = '${educador.senha}',
                                           email = '${educador.email}',
                                           palavra_chave = '${educador.palavra_chave}',
                                           id_cargo = '${educador.id_cargo}'


        where id = '${educador.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}

const deleteEducador = async function (id) {
    try {
        
        let sql = `delete from tbl_educador where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return result
    else
    return false
    } catch (error) {
   
        return false
    }
    
}

//função para listar educadores 
const selectAllEducador = async function(){
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

const selectByIdEducador = async function (id){
    try {
        let sql = `select * from tbl_educador where id = ${id}`

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
    selectAllEducador,
    deleteEducador,
    updateEducador,
    selectByIdEducador

}

