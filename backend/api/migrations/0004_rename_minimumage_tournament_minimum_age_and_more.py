# Generated by Django 5.1.7 on 2025-03-29 15:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_tournament_poster'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tournament',
            old_name='minimumAge',
            new_name='minimum_age',
        ),
        migrations.RenameField(
            model_name='tournament',
            old_name='playersOnField',
            new_name='players_on_field',
        ),
    ]
