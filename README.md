# IOT Semestral Project

## Client

* Frontend javascript app created with React

## Server

* Backend javascript app created with NestJS

## Authors

* `pavel0123` Pavel Suchánek 

## Deployment

* `docker-compose build` to build the images

* `docker save uuiot/frontend:latest | bzip2 | pv | ssh root@139.162.191.235 'bunzip2 | docker load'` to deploy the frontend image

* `docker save uuuiot/frontend:latest | bzip2 | pv | ssh root@139.162.191.235 'bunzip2 | docker load'` to deploy the backend image

* `cd iot_prod` to go to the production folder

* `docker-compose up -d` to start the containers