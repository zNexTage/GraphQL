const usuarios = [{
    id: 1,
    nome: "Asuka Langley",
    email:"asuka@email.com",
    idade: 16,
    perfil_id:1,
    status:'ATIVO'
},{
    id: 2,
    nome:"Rei Ayanami",
    email:"asuka@email.com",
    idade: 16,
    perfil_id:2,
    status:'INATIVO'
},{
    id: 3,
    nome:"Shinji Ikari",
    email:"shinji@email.com",
    idade: 15,
    perfil_id:1,
    status:'BLOQUEADO'
}];

const perfis = [{
    id:1,
    nome: "Comum"
},
{
    id:2,
    nome: "Administrador"
}];

module.exports = {usuarios, perfis};