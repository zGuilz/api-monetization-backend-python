#!/bin/bash

truffle migrate --reset

echo "Copiando arquivo de migrate atualizado para front e back"

file1="ApiContract.json"

cp -a ./build/contracts/"$file1" ./api-money-front/src/shared/abis/
cp -a ./build/contracts/"$file1" ./backend/backend-express/shared/

echo "Arquivos copiados"