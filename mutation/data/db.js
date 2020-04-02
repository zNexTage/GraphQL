let idEmail= 1;
let idPerfil = 1;
function proximoId(isPerfil){
    return isPerfil?idPerfil++:idEmail++;
}

const perfis = [
    { id: proximoId(true), nome: 'comum' },
    { id: proximoId(true), nome: 'administrador' }
]

const usuarios = [{
    id: proximoId(false),
    nome: 'João Silva',
    email: 'jsilva@zemail.com',
    idade: 29,
    perfil_id: 1,
    status: 'ATIVO'
}, {
    id: proximoId(false),
    nome: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    idade: 31,
    perfil_id: 2,
    status: 'INATIVO'
}, {
    id: proximoId(false),
    nome: 'Daniela Smith',
    email: 'danismi@umail.com',
    idade: 24,
    perfil_id: 1,
    status: 'BLOQUEADO'
}]

module.exports = { usuarios, perfis, proximoId }