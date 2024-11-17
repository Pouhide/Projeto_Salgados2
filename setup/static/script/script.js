// Função para obter o CSRF Token do HTML
function getCSRFToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

// Função para adicionar um produto ao carrinho
function addToCart(event, produtoNome, produtoPreco) {
    event.preventDefault(); // Impede o comportamento padrão do botão

    // Dados do produto
    const data = new URLSearchParams();
    data.append('produto_nome', produtoNome);
    data.append('produto_preco', produtoPreco);
    data.append('adicionar', 'true'); // Indica a ação de adicionar ao carrinho

    // Envia os dados para o backend
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCSRFToken(), // Inclui o CSRF Token no cabeçalho
        },
        body: data,
    })
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML = html; // Atualiza a página com a resposta do servidor
        alert('Produto adicionado ao carrinho!');
    })
    .catch(error => console.error('Erro ao adicionar ao carrinho:', error));
}

// Função para finalizar a compra
function finalizarCompra(event) {
    event.preventDefault(); // Impede o comportamento padrão do botão

    // Dados para finalizar a compra
    const data = new URLSearchParams();
    data.append('finalizar', 'true'); // Indica a ação de finalizar compra

    // Envia a requisição para o backend
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCSRFToken(),
        },
        body: data,
    })
    .then(response => response.text())
    .then(html => {
        document.body.innerHTML = html; // Atualiza a página com a resposta do servidor
        alert('Compra finalizada!');
    })
    .catch(error => console.error('Erro ao finalizar compra:', error));
}

// Adiciona eventos aos botões
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar ao carrinho
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        const produtoNome = button.dataset.produtoNome;
        const produtoPreco = button.dataset.produtoPreco;

        button.addEventListener('click', (event) => {
            addToCart(event, produtoNome, produtoPreco);
        });
    });

    // Finalizar compra
    const finalizarButton = document.querySelector('#finalizar-compra');
    if (finalizarButton) {
        finalizarButton.addEventListener('click', finalizarCompra);
    }
});
