from django.db import models
        
class Pedido(models.Model):
    produto = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField(default=1)
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantidade}x {self.produto} (R$ {self.preco})"