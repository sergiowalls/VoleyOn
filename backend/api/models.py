from django.db import models
from django.utils.translation import gettext_lazy as _

class Location(models.Model):
    name = models.CharField(max_length=100, verbose_name=_("nombre"))
    address = models.TextField(verbose_name=_("dirección"))
    postal_code = models.CharField(max_length=7, verbose_name=_("código postal"))
    city = models.CharField(max_length=100, verbose_name=_("ciudad"))
    province = models.CharField(max_length=100, verbose_name=_("provincia"))

    class Meta:
        verbose_name = _('ubicación')
        verbose_name_plural = _('ubicaciones')

    def __str__(self):
        return self.name

class Gender(models.TextChoices):
    MALE = 'Male', _('Masculino')
    FEMALE = 'Female', _('Femenino')
    MIXED = 'Mixed', _('Mixto')

class Field(models.TextChoices):
    BEACH = 'Beach', _('Playa')
    COURT = 'Court', _('Pista')
    SNOW = 'Snow', _('Nieve')

class Tournament(models.Model):
    name = models.CharField(max_length=100, verbose_name=_('nombre'))
    field = models.CharField(choices=Field, null=True, verbose_name=_('terreno'))
    gender = models.CharField(choices=Gender, null=True, verbose_name=_('género'))
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, verbose_name=_('ubicación'))
    players_on_field = models.IntegerField(null=True, verbose_name=_('jugadores en pista'))
    date = models.DateField(null=True, verbose_name=_('fecha'))
    price = models.FloatField(null=True, verbose_name=_('precio'))
    minimum_age = models.IntegerField(null=True, verbose_name=_('edad mínima'))
    link = models.URLField(null=True, verbose_name=_('enlace'))
    poster = models.URLField(null=True, verbose_name=_('cartel'))

    class Meta:
        verbose_name = _('torneo')
        verbose_name_plural = _('torneos')

    def __str__(self):
        return self.name