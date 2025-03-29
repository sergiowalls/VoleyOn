from rest_framework.generics import ListAPIView

from api.models import Tournament
from api.serializers import TournamentSerializer


class TournamentsList(ListAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer