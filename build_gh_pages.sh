#!/bin/bash

git checkout master
git branch -D gh-pages
git checkout -b gh-pages
git filter-branch --subdirectory-filter docs/ -f
git checkout master
