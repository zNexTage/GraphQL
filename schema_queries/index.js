const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    scalar Date

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
    }
`;

const resolvers = {
    Usuario:{
        //Atributo salario recebera como parametro o obj salario
        salario(usuario){

            //Retorna o salario_real que foi declarado abaixo
            return usuario.salario_real;
        }
    },
    Produto:{
        precoComDesconto(produto){
            const preco = produto.preco;
            const desconto = produto.desconto;           

            if(desconto){
                return preco * (1 - desconto);
            }

            return preco;
        }
    },
    Query:{
        ola(){
            return 'Olá mundo from GraphQL';
        },

        horaAtual(){
            return new Date();
        },

        usuarioLogado(){
            return {
                id:1,
                nome:'Asuka',
                email:'asukalangley@email.com',
                idade:17,
                salario_real: 1.500, //O nome desse attr está diferente do que foi declarado, portanto precisa de um resolver para funcionar
                vip: true
            }
        },
        produto(){
            return {
                nome: 'Xbox One X',
                preco: 2499,
                desconto:0.15
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url})=>{
    console.log(`Executando em ${url}`);
});