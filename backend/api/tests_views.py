from datetime import date

from django.test import TestCase
from rest_framework.test import APIClient

from api.models import Field, Gender, Location, Tournament


class TournamentsListViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.madrid = Location.objects.create(
            name='Polideportivo Madrid',
            address='Calle A 1',
            postal_code='28002',
            city='Madrid',
            province='Madrid',
        )
        self.barcelona = Location.objects.create(
            name='Pista Barcelona',
            address='Calle B 2',
            postal_code='08001',
            city='Barcelona',
            province='Barcelona',
        )
        self.sevilla = Location.objects.create(
            name='Pabellón Sevilla',
            address='Avenida C 3',
            postal_code='41001',
            city='Sevilla',
            province='Sevilla',
        )
        Tournament.objects.create(
            name='Torneo Playa',
            field=Field.BEACH,
            gender=Gender.MIXED,
            location=self.madrid,
            players_on_field=2,
            date=date(2026, 8, 1),
            price=20,
            minimum_age=18,
        )
        Tournament.objects.create(
            name='Torneo Pista',
            field=Field.COURT,
            gender=Gender.MALE,
            location=self.barcelona,
            players_on_field=6,
            date=date(2026, 6, 15),
            price=12,
            minimum_age=14,
        )
        Tournament.objects.create(
            name='Torneo Nieve',
            field=Field.SNOW,
            gender=Gender.FEMALE,
            location=self.sevilla,
            players_on_field=4,
            date=date(2026, 7, 10),
            price=15,
            minimum_age=16,
        )

    def test_list_returns_all_tournaments(self):
        response = self.client.get('/tournaments/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)

    def test_list_filters_by_field(self):
        response = self.client.get('/tournaments/?field=Beach')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Torneo Playa')

    def test_list_filters_by_gender(self):
        response = self.client.get('/tournaments/?gender=Male')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Torneo Pista')

    def test_list_filters_by_players_on_field(self):
        response = self.client.get('/tournaments/?players_on_field=4')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Torneo Nieve')

    def test_list_filters_by_date_gte(self):
        response = self.client.get('/tournaments/?date__gte=2026-07-01')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        names = {t['name'] for t in response.data}
        self.assertEqual(names, {'Torneo Playa', 'Torneo Nieve'})

    def test_list_filters_by_date_lte(self):
        response = self.client.get('/tournaments/?date__lte=2026-07-01')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Torneo Pista')

    def test_list_filters_by_date_range(self):
        response = self.client.get('/tournaments/?date__gte=2026-07-01&date__lte=2026-07-31')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Torneo Nieve')

    def test_list_filters_by_price_lte(self):
        response = self.client.get('/tournaments/?price__lte=15')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        names = {t['name'] for t in response.data}
        self.assertEqual(names, {'Torneo Pista', 'Torneo Nieve'})

    def test_list_filters_by_minimum_age_lte(self):
        response = self.client.get('/tournaments/?minimum_age__lte=16')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        names = {t['name'] for t in response.data}
        self.assertEqual(names, {'Torneo Pista', 'Torneo Nieve'})

    def test_list_filters_by_location_province(self):
        response = self.client.get('/tournaments/?location__province=Barcelona')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['location']['province'], 'Barcelona')

    def test_list_filters_by_field_and_province(self):
        response = self.client.get('/tournaments/?field=Beach&location__province=Madrid')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Torneo Playa')

    def test_list_orders_by_date(self):
        response = self.client.get('/tournaments/?ordering=date')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['name'], 'Torneo Pista')
        self.assertEqual(response.data[1]['name'], 'Torneo Nieve')
        self.assertEqual(response.data[2]['name'], 'Torneo Playa')
