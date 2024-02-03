#!/bin/bash
chmod +x start.sh

# Substitua 'sua-senha-aqui' pela sua senha real
docker run -d -p 6379:6379 --name redis redis

# Aguarde o Redis iniciar (ajuste conforme necessário)
sleep 10

docker build -t my-app:latest .
docker run --name app -p 4000:4000 --link redis my-app:latest
