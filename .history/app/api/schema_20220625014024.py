import graphene
from graphene_django.types import DjangoObjectType
from graphene_django import DjangoObjectType
from django.db.models import Q
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.db.models import Sum

from .schemas.query import intranet




class Query(intranet.Query):
        pass
class Mutation(intranet.Mutation):
        pass

schema = graphene.Schema(query=Query, mutation=Mutation)

