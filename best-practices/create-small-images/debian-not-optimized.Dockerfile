# Using debian buster slim as base
FROM node:14-slim

# Set the working directory
WORKDIR /app

# Copy over package files
COPY package* ./

# Install python & C-compiler, then install npm dependencies, then clean all that up, all in separate, sad layers
RUN apt-get update
RUN apt-get install --no-install-recommends -y \
        g++ \
        make \
        python
RUN npm ci --production

# The following lines don't reduce the image size, try toggling them to see
RUN apt-get remove -y \
        g++ \
        make \
        python
RUN apt-get autoremove -y
RUN rm -rf /var/cache/apt/archives

# go on to change user, copy over index.js, and set CMD, etc.
