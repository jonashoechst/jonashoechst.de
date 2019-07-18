#!/usr/bin/env bash

set -e

TARGET='hoechst7@harrington.uberspace.de:~/html'

bundle exec jekyll build

rsync -avh _site/ "$TARGET"