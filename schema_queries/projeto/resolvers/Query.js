const {usuarios, perfis} = require('../data/db');

module.exports = {
    ola() {
        return 'Olá mundo from GraphQL';
    },

    horaAtual() {
        return new Date();
    },

    usuarioLogado() {
        return {
            id: 1,
            nome: 'Asuka',
            email: 'asukalangley@email.com',
            idade: 17,
            salario_real: 1.500, //O nome desse attr está diferente do que foi declarado, portanto precisa de um resolver para funcionar
            vip: true
        }
    },
    produto() {
        return {
            nome: 'Xbox One X',
            preco: 2499,
            desconto: 0.15
        }
    },
    numerosMegaSena() {
        const crescente = (a, b) => a-b;

        return Array(6).fill(0)
        .map(n=>parseInt(Math.random() * 60 + 1))
        .sort(crescente)
        
        //return [4, 8, 13, 27, 33, 54];
    },
    usuarios(){
        return usuarios;
    },
    /*Sem destructuring
    usuario(obj, args){
        const selecionados = usuarios.filter(u => u.id === parseInt(args.id));

        return selecionados ? selecionados[0] : null;
    }*/

    usuario(obj, {id}){
        const selecionados = usuarios.filter(u=>u.id === parseInt(id));

        return selecionados ? selecionados[0] : null;
    },

    perfis(){
        return perfis;
    },
    perfil(obj, {id}){
        const getPerfil = perfis.filter(p => p.id === id);

        return getPerfil ? getPerfil[0] : null;
    }
}