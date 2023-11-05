#!/bin/bash
docker stop dni-cms-web dni-cms-service dni-master-service dni-master-web
docker rm dni-cms-web dni-cms-service dni-master-service dni-master-web
docker rmi dniinvest/dni_cms_web:latest dniinvest/dni_master_service:latest dniinvest/dni_cms_service:latest dniinvest/dni_master_web:latest
docker-compose up -d 
docker ps 