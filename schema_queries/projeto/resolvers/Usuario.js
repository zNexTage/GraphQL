const {perfis} =require('../data/db');

module.exports = {
     //Atributo salario recebera como parametro o obj salario
     salario(usuario) {

        //Retorna o salario_real que foi declarado abaixo
        return usuario.salario_real;
    },
    perfil({perfil_id}){
        const sels = perfis.filter(p => p.id === perfil_id);

        return sels ? sels[0]:null;
    }
}