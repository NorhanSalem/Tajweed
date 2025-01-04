#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Step 1: Remove old build directory (if it exists)
rm -rf ./dist

# Step 2: Install dependencies
docker run -it --rm \
  --volume ${PWD}:/app \
  --workdir='/app' \
  node:18-alpine3.17 /bin/sh -c "apk add --no-cache git && yarn install"

# Step 3: Build the project without stopping on TypeScript errors
docker run -it --rm \
  --volume ${PWD}:/app \
  --workdir='/app' \
  node:18-alpine3.17 /bin/sh -c "yarn tsc --noEmit || true && yarn vite build"
