#!/bin/sh

branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" = "prod" ]; then
  echo "Branch is 'production', updating version in package.json..."
  npm version patch
fi
