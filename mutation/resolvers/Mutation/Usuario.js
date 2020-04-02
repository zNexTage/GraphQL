const {usuarios, proximoId} = require('../../data/db');

function indiceUsuario(filtro){
    if(!filtro){
        return -1;
    }

    const {id, email} = filtro;

    if(id){
        return usuarios.findIndex(u => u.id === id);
    }
    else if(email){
        return usuarios.findIndex(u => u.email === email);
    }

    return -1;
}

module.exports = {
    /* OUtra forma de add um novo usuario
    novoUsuario(_, {nome, email, idade}){
        const novo = {
            id: proximoId(),
            nome,
            email, 
            idade, 
            perfil_id:1,
            status:'ATIVO'
        }

        usuarios.push(novo);

        return novo;
    }*/
    

    novoUsuario(_, {dados}){
        //Verifica se o email digitado está cadastrado
        const emailExistente = usuarios.some(u => u.email === dados.email); 

        if(emailExistente){
            throw new Error('E-mail já cadastrado');
        }

        const novo = {
            id: proximoId(false),
            ...dados,
            perfil_id:1,
            status:'ATIVO'
        }

        usuarios.push(novo);

        return novo;
    },
    excluirUsuario(_, {filtro}){
        const index = indiceUsuario(filtro);

        if(index < 0){
            return null;
        }

        const excluidos = usuarios.splice(index , 1);

        return excluidos ? excluidos[0]:null;
    },
    alterarUsuario(_, {filtro, dados}){
        const index = indiceUsuario(filtro); //Procura o usuario no array

        if(index < 0){
            return null;
        }

        console.log(dados);

        const usuario = {
            ...usuarios[index], //Adiciona o usuario no objeto
            ...dados //Sobrescreve os valores com o que foi passado na função para realizar a alteração
        }

        usuarios.splice(index, 1, usuario);

        return usuario;
    }

}