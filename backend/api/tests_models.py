from django.test import TestCase

from api.models import Location, Tournament


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
