import graphene
from graphene_django.types import DjangoObjectType
from graphene_django import DjangoObjectType
from django.db.models import Q
from api.models import *
from login.models import *
from intranet.models import *

from graphene.types.generic import GenericScalar # Solution


class AsignaturasType(DjangoObjectType):
    class Meta:
        model = Asignaturas
        exclude_fields = ('created', 'modified')

class Query(graphene.ObjectType):
    all_asignaturas = graphene.List(AsignaturasType)

    def resolve_all_asignaturas(self, info):
        return Asignaturas.objects.all()

class Mutation(graphene.ObjectType):
    pass
