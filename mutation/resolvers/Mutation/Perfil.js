const {perfis, proximoId} = require('../../data/db');

function indicePerfil(filtro){
    if(!filtro){
        return -1;
    }

    const {id, nome} = filtro;

    if(id){
        return perfis.findIndex(p => p.id === id);
    }
    else if(nome){
        return perfis.findIndex(p => p.nome === nome);
    }

    return -1;
}

module.exports = {
    novoPerfil(_,{dados}){
        const nome = dados.nome;

        const perfilExistente = perfis.some(p => p.nome === nome);
    
        if(perfilExistente){
            throw new Error("Perfil já cadastrado!");
        }
    
        const novo = {
            id: proximoId(true),
            nome:nome
        };
    
        perfis.push(novo);
    
        return novo;
    },
    alterarPerfil(_, {filtro, dados}){
        const indice = indicePerfil(filtro);

        perfis[indice].nome = dados.nome;

        return perfis[indice];
    },
    deletarPerfil(_, {filtro}){
        const index = indicePerfil(filtro);

        if(index < 0){
            return null;
        }

        const excluidos = perfis.splice(index , 1);

        return excluidos ? excluidos[0]:null;
    }


}

 