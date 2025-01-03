# Generated by Django 5.1.3 on 2024-11-17 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('galeria', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('produto', models.CharField(max_length=100)),
                ('preco', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantidade', models.PositiveIntegerField(default=1)),
                ('data', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
