# pull official base image
FROM python:3.8-slim

# set work directory
WORKDIR /usr/src/app

# install psycopg2 dependencies
#RUN apk update \
#   && apk add postgresql-dev gcc python3-dev musl-dev zlib-dev jpeg-dev libffi-dev libxml2-dev libxslt-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt


# fix libraries
COPY ./fixlib/graphene/utils.py /usr/local/lib/python3.8/site-packages/graphene_django/utils/


# copy project
COPY . /usr/src/app/


