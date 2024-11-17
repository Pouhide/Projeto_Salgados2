from django.shortcuts import render
from .models import Pedido

def index(request):
    return render(request, 'galeria/index.html')

def sobre(request):
    return render(request, 'galeria/sobre.html')

#Banco de dados   
# Carrinho na memória
carrinho = []

def loja_view(request):
    mensagem = None

    if request.method == "POST":
        print("POST Data:", request.POST)  # Debug

        # Adicionando ao carrinho
        if "adicionar" in request.POST:
            nome = request.POST.get("produto_nome")
            preco = request.POST.get("produto_preco")
            if nome and preco:
                carrinho.append({"nome": nome, "preco": float(preco)})
                print(f"Adicionado ao Carrinho: {nome} - R$ {preco}")

        # Finalizando a compra e salvando no banco de dados
        elif "finalizar" in request.POST:
            print("Finalizando Compra...")
            for item in carrinho:
                Pedido.objects.create(
                    produto=item["nome"], preco=item["preco"], quantidade=1
                )
            carrinho.clear()  # Limpa o carrinho após finalizar
            mensagem = "Compra finalizada!"

    # Renderizar a página com o contexto atualizado
    return render(request, "galeria/loja.html", {"carrinho": carrinho, "mensagem": mensagem})