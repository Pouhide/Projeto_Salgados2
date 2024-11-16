// Função para obter o CSRF Token do HTML
function getCSRFToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

// Função para buscar entradas
function loadEntries() {
    fetch('/api/entries/')
        .then(response => response.json())
        .then(data => {
            const entriesList = document.getElementById('entries');
            entriesList.innerHTML = '';
            data.forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.name}: ${entry.description}`;
                entriesList.appendChild(li);
            });
        });
}

// Função para adicionar uma nova entrada
function addEntry() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    fetch('/api/entries/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCSRFToken(), // Inclui o CSRF Token no cabeçalho
        },
        body: `name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`
    })
    .then(response => response.json())
    .then(() => {
        loadEntries(); // Atualizar a lista de entradas
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
    })
    .catch(error => console.error('Erro ao adicionar entrada:', error));
}

// Carregar as entradas ao abrir a página
document.addEventListener('DOMContentLoaded', loadEntries);
