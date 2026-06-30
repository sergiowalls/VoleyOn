from datetime import date

from django.test import TestCase

from api.models import Field, Gender, Location, Tournament
from api.serializers import LocationSerializer, TournamentSerializer


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
