# Generated by Django 4.2.6 on 2023-12-13 20:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('concesionarioapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Repuesto',
            fields=[
                ('id_repuesto', models.AutoField(primary_key=True, serialize=False, verbose_name='ID del Repuesto')),
                ('nombre_repuesto', models.CharField(unique=True, verbose_name='Nombre del Repuesto')),
                ('precio_repuesto', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Precio del Repuesto')),
                ('descripcion_repuesto', models.CharField(blank=True, max_length=100, null=True, verbose_name='Descripción del Repuesto')),
            ],
            options={
                'verbose_name': 'Repuesto',
                'verbose_name_plural': 'Repuestos',
                'ordering': ['nombre_repuesto'],
            },
        ),
        migrations.CreateModel(
            name='Uso_Repuesto',
            fields=[
                ('id_uso_repuesto', models.AutoField(primary_key=True, serialize=False, verbose_name='ID del Uso del Repuesto')),
                ('id_modelo', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='concesionarioapp.modelo')),
                ('id_repuesto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='concesionarioapp.repuesto')),
            ],
            options={
                'verbose_name': 'Uso del Repuesto',
                'verbose_name_plural': 'Usos de los Repuestos',
                'ordering': ['id_uso_repuesto'],
                'unique_together': {('id_repuesto', 'id_modelo')},
            },
        ),
        migrations.CreateModel(
            name='Inventario_Repuesto',
            fields=[
                ('id_inventario_repuesto', models.AutoField(primary_key=True, serialize=False, verbose_name='ID del Inventario de Repuesto')),
                ('cantidad', models.IntegerField(default=0, verbose_name='Cantidad de Repuestos en Inventario')),
                ('id_repuesto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='concesionarioapp.repuesto')),
                ('id_sucursal', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='concesionarioapp.sucursal')),
            ],
            options={
                'verbose_name': 'Inventario de Repuesto',
                'verbose_name_plural': 'Inventarios de Repuestos',
                'ordering': ['id_inventario_repuesto'],
                'unique_together': {('id_repuesto', 'id_sucursal')},
            },
        ),
    ]