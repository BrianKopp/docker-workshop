# Using debian buster slim as base
FROM node:14-slim

# Set the working directory
WORKDIR /app

# Copy over package files
COPY package* ./

# Install python & C-compiler, then install npm dependencies, then clean all that up, all within the same layer
RUN set -eux; \
    apt-get update; \
    apt-get install --no-install-recommends -y \
        g++ \
        make \
        python; \
    npm ci --production; \
    apt-get remove -y \
        g++ \
        make \
        python; \
    apt-get autoremove -y; \
    rm -rf /var/cache/apt/archives;

# go on to change user, copy over index.js, and set CMD, etc.