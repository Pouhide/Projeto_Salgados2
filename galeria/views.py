from django.shortcuts import render
from django.http import JsonResponse
from .models import Pedido
from decimal import Decimal


# Página inicial
def index(request):
    carrinho = request.session.get('carrinho', [])  # Recupera o carrinho da sessão
    mensagem = request.GET.get('mensagem', '')  # Mensagem opcional (se houver)
    return render(request, 'galeria/index.html', {'carrinho': carrinho, 'mensagem': mensagem})

# Página sobre
def sobre(request):
    return render(request, 'galeria/sobre.html')


# Recuperar carrinho da sessão
def get_carrinho(request):
    return request.session.get('carrinho', [])


# Salvar carrinho na sessão
def salvar_carrinho(request, carrinho):
    request.session['carrinho'] = carrinho
    request.session.modified = True


# Retorna o carrinho atual
def api_carrinho(request):
    carrinho = get_carrinho(request)
    print("Carrinho atual:", carrinho)  # Log para depuração
    return JsonResponse(carrinho, safe=False)


def api_carrinho_add(request):
    if request.method == 'POST':
        nome = request.POST.get('nome')
        preco = request.POST.get('preco')
        quantidade = request.POST.get('quantidade', 1)  # Quantidade padrão é 1

        if nome and preco:
            try:
                # Valida e converte os dados
                preco = Decimal(preco)
                quantidade = int(quantidade)

                # Salva diretamente no banco de dados
                pedido = Pedido.objects.create(
                    produto=nome,
                    preco=preco,
                    quantidade=quantidade
                )
                print(f"Pedido salvo: {pedido}")  # Log para depuração
                return JsonResponse({'status': 'success', 'message': f'Item {nome} adicionado ao banco com sucesso!'})
            except Exception as e:
                print(f"Erro ao salvar no banco: {e}")  # Log de erro
                return JsonResponse({'status': 'error', 'message': 'Erro ao salvar no banco de dados!'}, status=500)
        else:
            return JsonResponse({'status': 'error', 'message': 'Dados inválidos'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)
