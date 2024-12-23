import graphene
from graphene_django.types import DjangoObjectType
from graphene_django import DjangoObjectType
from django.db.models import Q
from api.models import *
from login.models import *

from graphene.types.generic import GenericScalar # Solution


class Query(graphene.ObjectType):
    pass

class Mutation(graphene.ObjectType):
    pass
