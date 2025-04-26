from rest_framework import filters
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend

from api.models import Tournament
from api.serializers import TournamentSerializer


class TournamentsList(ListAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = {'field': ['exact'], 'gender': ['exact'], 'players_on_field': ['exact'], 'date': ['gte', 'lte'],
                        'price': ['lte'], 'minimum_age': ['lte'], 'location__province': ['exact']}
    ordering_fields = ['date']
