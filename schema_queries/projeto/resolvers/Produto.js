module.exports = {
    precoComDesconto(produto) {
        const preco = produto.preco;
        const desconto = produto.desconto;

        if (desconto) {
            return preco * (1 - desconto);
        }

        return preco;
    }
}