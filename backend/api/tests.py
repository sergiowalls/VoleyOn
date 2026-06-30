from datetime import date

from django.test import TestCase
from rest_framework.test import APIClient

from api.models import Field, Gender, Location, Tournament
from api.serializers import LocationSerializer, TournamentSerializer


class LocationModelTests(TestCase):
    def test_str_returns_name(self):
        location = Location.objects.create(
            name='Madrid Arena',
            address='Calle Falsa 123',
            postal_code='28001',
            city='Madrid',
            province='Madrid',
        )

        self.assertEqual(str(location), 'Madrid Arena')


class TournamentModelTests(TestCase):
    def test_str_returns_name(self):
        tournament = Tournament.objects.create(name='Open Madrid')

        self.assertEqual(str(tournament), 'Open Madrid')


class LocationSerializerTests(TestCase):
    def test_location_serializer_includes_all_fields(self):
        location = Location.objects.create(
            name='Pabellón Central',
            address='Avenida Principal 10',
            postal_code='46001',
            city='Valencia',
            province='Valencia',
        )

        data = LocationSerializer(location).data

        self.assertEqual(data['id'], location.id)
        self.assertEqual(data['name'], 'Pabellón Central')
        self.assertEqual(data['address'], 'Avenida Principal 10')
        self.assertEqual(data['postal_code'], '46001')
        self.assertEqual(data['city'], 'Valencia')
        self.assertEqual(data['province'], 'Valencia')


class TournamentSerializerTests(TestCase):
    def test_tournament_serializer_nests_location(self):
        location = Location.objects.create(
            name='Centro Deportivo',
            address='Calle Norte 7',
            postal_code='41001',
            city='Sevilla',
            province='Sevilla',
        )
        tournament = Tournament.objects.create(
            name='Copa Sur',
            field=Field.COURT,
            gender=Gender.FEMALE,
            location=location,
            players_on_field=6,
            date=date(2026, 4, 12),
            price=18.5,
            minimum_age=16,
            link='https://example.com/copa-sur',
            poster='https://example.com/copa-sur.jpg',
        )

        data = TournamentSerializer(tournament).data

        self.assertEqual(data['id'], tournament.id)
        self.assertEqual(data['name'], 'Copa Sur')
        self.assertEqual(data['field'], Field.COURT)
        self.assertEqual(data['gender'], Gender.FEMALE)
        self.assertEqual(data['players_on_field'], 6)
        self.assertEqual(data['date'], '2026-04-12')
        self.assertEqual(data['price'], 18.5)
        self.assertEqual(data['minimum_age'], 16)
        self.assertEqual(data['link'], 'https://example.com/copa-sur')
        self.assertEqual(data['poster'], 'https://example.com/copa-sur.jpg')
        self.assertEqual(data['location']['id'], location.id)
        self.assertEqual(data['location']['name'], 'Centro Deportivo')
        self.assertEqual(data['location']['province'], 'Sevilla')


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

    def test_list_returns_all_tournaments(self):
        response = self.client.get('/tournaments/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_list_filters_by_field(self):
        response = self.client.get('/tournaments/?field=Beach')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Torneo Playa')

    def test_list_filters_by_location_province(self):
        response = self.client.get('/tournaments/?location__province=Barcelona')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['location']['province'], 'Barcelona')

    def test_list_orders_by_date(self):
        response = self.client.get('/tournaments/?ordering=date')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['name'], 'Torneo Pista')
        self.assertEqual(response.data[1]['name'], 'Torneo Playa')
