// Função para obter o CSRF Token do HTML
function getCSRFToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

// Função para carregar os itens do carrinho
function loadCarrinho() {
    fetch('/api/carrinho/')
        .then(response => response.json())
        .then(data => {
            const carrinhoList = document.getElementById('carrinho');
            carrinhoList.innerHTML = ''; // Limpar lista atual
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
                carrinhoList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar o carrinho:', error));
}

// Função para adicionar um produto ao carrinho
function addToCart(nome, preco) {
    fetch('/api/carrinho/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCSRFToken(),
        },
        body: `nome=${encodeURIComponent(nome)}&preco=${encodeURIComponent(preco)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message); // Mostrar mensagem de sucesso
            loadCarrinho(); // Atualizar o carrinho na página
        } else {
            alert('Erro: ' + data.message);
        }
    })
    .catch(error => console.error('Erro ao adicionar ao carrinho:', error));
}

// Configuração dos botões "Comprar"
document.addEventListener('DOMContentLoaded', () => {
    // Selecionar todos os botões com a classe 'add-to-cart'
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        const nome = button.dataset.produtoNome; // Nome do produto
        const preco = button.dataset.produtoPreco; // Preço do produto

        // Adicionar evento de clique
        button.addEventListener('click', () => {
            addToCart(nome, preco);
        });
    });

    // Carregar o carrinho ao iniciar a página
    loadCarrinho();
});
