// Função para obter o CSRF Token do HTML
function getCSRFToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

// Função para salvar diretamente no banco de dados
function addToCart(nome, preco) {
    console.log(`Enviando para o banco: Nome=${nome}, Preço=${preco}`); // Log para depuração

    fetch('/api/carrinho/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCSRFToken(),
        },
        body: `nome=${encodeURIComponent(nome)}&preco=${encodeURIComponent(preco)}&quantidade=1`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message); // Exibe mensagem de sucesso
        } else {
            alert('Erro: ' + data.message);
        }
    })
    .catch(error => console.error('Erro ao enviar para o banco:', error));
}

// Adiciona eventos aos botões "Comprar"
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript carregado."); // Log para depuração

    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        const nome = button.dataset.produtoNome;
        const preco = button.dataset.produtoPreco;

        button.addEventListener('click', () => {
            addToCart(nome, preco); // Envia os dados diretamente para o banco
        });
    });
});
