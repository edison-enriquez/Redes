#!/bin/bash

# Ruta temporal para el book
TEMP_BOOK_DIR="/tmp/book"

# Asegúrate de estar en el directorio raíz del repositorio
cd "$(git rev-parse --show-toplevel)"

# Mostrar el estado del repositorio
git status

# Agregar todos los cambios
git add -A
git status

# Realizar el commit
git commit -m "update"
git status

# Cambiar el nombre de la rama actual a main (si es necesario)
git branch -m main

# Empujar los cambios a la rama principal en GitHub
git push github main

# Añadir el worktree para gh-pages
git worktree add $TEMP_BOOK_DIR gh-pages
git worktree list

# Construir el libro usando mdBook
mdbook build

# Limpiar el directorio temporal y copiar los archivos del libro
rm -rf $TEMP_BOOK_DIR/*
cp -rp book/* $TEMP_BOOK_DIR

# Navegar al directorio temporal
pushd $TEMP_BOOK_DIR

# Mostrar el estado del repositorio en el worktree
git status

# Agregar todos los cambios en el worktree
git add -A
git commit -m "update"

# Empujar los cambios a la rama gh-pages en GitHub
git push github gh-pages

# Regresar al directorio anterior
popd

# Remover el worktree
git worktree remove $TEMP_BOOK_DIR
