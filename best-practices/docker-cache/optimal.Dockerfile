FROM node:14-slim

# Install linux distro package manager deps first (in a multi-stage command)
# This command does not depend on the source code at all!
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

WORKDIR /app

# Then, send in configuration files
# Here, we need to copy to `./` instead of `.` since we are copying multiple files
COPY package* ./

# Next, install the NPM dependencies
# Note we haven't copied any javascript files yet, so even if we make changes to
# our index.js file, we won't need to re-run this command.
RUN npm ci

# Finally, copy out source code
COPY index.js .
