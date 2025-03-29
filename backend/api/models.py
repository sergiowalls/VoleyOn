from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    postal_code = models.CharField(max_length=7)
    city = models.CharField(max_length=100)
    province = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Gender(models.TextChoices):
    MALE = 'Male'
    FEMALE = 'Female'
    MIXED = 'Mixed'

class Field(models.TextChoices):
    BEACH = 'Beach'
    COURT = 'Court'
    SNOW = 'Snow'

class Tournament(models.Model):
    name = models.CharField(max_length=100)
    field = models.CharField(choices=Field, null=True)
    gender = models.CharField(choices=Gender, null=True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    playersOnField = models.IntegerField(null=True)
    date = models.DateField(null=True)
    price = models.FloatField(null=True)
    minimumAge = models.IntegerField(null=True)
    link = models.URLField(null=True)
    poster = models.URLField(null=True)

    def __str__(self):
        return self.name