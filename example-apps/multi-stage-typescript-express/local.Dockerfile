# local
FROM node:14.17.6-alpine

WORKDIR /app

# Copy over npm things
COPY package* ./

# Install npm dependencies
RUN npm ci

# Copy over the rest of the files
COPY . .
