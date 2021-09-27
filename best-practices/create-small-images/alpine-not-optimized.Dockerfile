# Using alpine as base
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy over package files
COPY package* ./

# Install python & C-compiler, then install npm dependencies, then clean all that up, all on separate layers
RUN apk add --no-cache --virtual mynewrelicdeps \
        g++ \
        make \
        python
# Install npm deps
RUN npm ci --production

# Clean up dependencies - doesn't make image smaller! try toggling this on and off
RUN apk del mynewrelicdeps

# go on to change user, copy over index.js, and set CMD, etc.