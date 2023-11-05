#!/bin/bash
DOCKER_USERNAME=dniinvest
DOCKER_PASSWORD=Aa@123456
DOCKER_IMAGE=dni_cms_service
DOCKER_TAG=latest
echo "------------------------- LOGIN DOCKER -----------------------------"
echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin

echo "------------------------- BUIDING IMAGE ---------------------------"
docker build -t ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG} . --no-cache
docker images | grep ${DOCKER_IMAGE}
docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}
docker rmi -f ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}