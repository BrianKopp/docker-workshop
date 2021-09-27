# Using alpine as base
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy over package files
COPY package* ./

# Install python & C-compiler, then install npm dependencies, then clean all that up, all within the same layer
RUN set -eux; \
    apk add --no-cache --virtual mynewrelicdeps \
        g++ \
        make \
        python; \
    npm ci --production; \
    apk del mynewrelicdeps;

# go on to change user, copy over index.js, and set CMD, etc.