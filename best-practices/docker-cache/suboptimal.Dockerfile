FROM node:14-slim

WORKDIR /app

# Copy source code
COPY . .


# Install linux distro package manager deps
RUN set -eux; \
    apt-get update; \
    apt-get install -y \
        vim \
        jq \
        zip \
        unzip \
        python \
        g++ \
        make \
        telnet \
        procps;

# Next, install the NPM dependencies
RUN npm ci
