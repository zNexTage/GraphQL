const { ApolloServer, gql } = require('apollo-server');
const usuarios = [{
    id: 1,
    nome: "Asuka Langley",
    email:"asuka@email.com",
    idade: 16
},{
    id: 2,
    nome:"Rei Ayanami",
    email:"asuka@email.com",
    idade: 16
},{
    id: 3,
    nome:"Shinji Ikari",
    email:"shinji@email.com",
    idade: 15
}];

const perfis = [{
    id:1,
    nome: "Comum"
},
{
    id:2,
    nome: "Administrador"
}];

const typeDefs = gql`
    scalar Date

    type Perfil{
        id: Int
        nome: String
    }

    type Produto{
        nome: String!
        preco: Float!
        desconto:Float
        precoComDesconto:Float
    }

    type Usuario{
        id:ID
        nome: String!
        email:String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    #Pontos de entrada da sua API
    type Query{
        ola: String
        horaAtual: Date
        usuarioLogado: Usuario
        produto:Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: ID): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }
`;

const resolvers = {
    Usuario: {
        //Atributo salario recebera como parametro o obj salario
        salario(usuario) {

            //Retorna o salario_real que foi declarado abaixo
            return usuario.salario_real;
        }
    },
    Produto: {
        precoComDesconto(produto) {
            const preco = produto.preco;
            const desconto = produto.desconto;

            if (desconto) {
                return preco * (1 - desconto);
            }

            return preco;
        }
    },
    Query: {
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
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`);
});