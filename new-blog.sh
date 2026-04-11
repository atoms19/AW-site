#!/bin/sh

read -p "enter name of file: " name
read -p "title of the blog: " title 
read -p "short description: " descpt
date=$(date '+%b %d %Y')

path="$PWD/src/content/blog/$name.md"

# creating file in directory

cat << EOF > $path
---
title : '$title'
description: '$descpt'
pubDate: '$date'
heroImage: ''
---

EOF

setsid foot nvim $path >/dev/null 2>&1 &
