#!/bin/bash

# Ruta temporal para el book
TEMP_BOOK_DIR="/tmp/book"

# Asegúrate de estar en el directorio raíz del repositorio
cd "$(git rev-parse --show-toplevel)" || exit

# Mostrar el estado del repositorio
echo "Estado del repositorio:"
git status

# Agregar todos los cambios
echo "Agregando cambios:"
git add -A
git status

# Realizar el commit
echo "Realizando commit:"
git commit -m "update"
git status

# Cambiar el nombre de la rama actual a main (si es necesario)
echo "Cambiando nombre de la rama a main (si es necesario):"
git branch -m main

# Empujar los cambios a la rama principal en GitHub
echo "Empujando cambios a la rama main en GitHub:"
git push origin main

# Añadir el worktree para gh-pages
echo "Añadiendo worktree para gh-pages:"
git worktree add $TEMP_BOOK_DIR gh-pages
git worktree list

# Construir el libro usando mdBook
echo "Construyendo el libro:"
mdbook build

# Limpiar el directorio temporal y copiar los archivos del libro
echo "Copiando archivos del libro al directorio temporal:"
rm -rf $TEMP_BOOK_DIR/*
cp -rp book/* $TEMP_BOOK_DIR

# Navegar al directorio temporal
echo "Navegando al directorio temporal:"
pushd $TEMP_BOOK_DIR || exit

# Mostrar el estado del repositorio en el worktree
echo "Estado del worktree:"
git status

# Agregar todos los cambios en el worktree
echo "Agregando cambios en el worktree:"
git add -A
git commit -m "update"

# Empujar los cambios a la rama gh-pages en GitHub
echo "Empujando cambios a la rama gh-pages en GitHub:"
git push origin gh-pages

# Regresar al directorio anterior
echo "Regresando al directorio anterior:"
popd || exit

# Remover el worktree
echo "Removiendo el worktree:"
git worktree remove $TEMP_BOOK_DIR
