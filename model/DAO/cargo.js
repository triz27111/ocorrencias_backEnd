const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient

const insertCargo = async function(cargo){
    try {
        let sql = `insert into tbl_cargo(nome)
                                         values('${cargo.nome}')`

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
//Função para atualizar uma genero existente 
const updateCargo = async function (cargo){
    try {
        let sql = `update tbl_cargo set nome = '${cargo.nome}'
        where id = '${cargo.id}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else 
            return false 
        
    } catch (error) {
        return false 
    }
}


//função para deletar uma genero 
const deleteCargo = async function (id) {
    try {
        
        let sql = `delete from tbl_cargo where id = ${id}`

     

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return result
    else
    return false
    } catch (error) {
   
        return false
    }
    
}

//função para mostrar todas as genero 
const selectAllCargo = async function (){
    try {
        sql = `select * from tbl_cargo order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false 
    }
}

//função para busca pelo ID 
const selectByIdCargo = async function (id){
    try {
        let sql = `select * from tbl_cargo where id = ${id}`

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
        insertCargo,
        updateCargo,
        deleteCargo,
        selectAllCargo,
        selectByIdCargo
    }