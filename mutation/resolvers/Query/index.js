const Query = require('./Query')
const Usuario = require('./Usuario');
const Perfil = require('./Perfil');

module.exports = {
    ...Query, ...Usuario, ...Perfil
}