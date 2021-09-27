# Build stage
FROM node:14.17.6-alpine as build

WORKDIR /app

# Chown the directory
RUN chown -R node:node /app

# Copy over npm things
COPY --chown=node:node package* ./

# Install npm dependencies
RUN npm ci

# Copy over the rest of the files
COPY --chown=node:node . .

# Set the user to node
USER node

# Build typescript code
RUN npm run build

# Run linting
RUN npm run lint

# Deploy stage
FROM node:14.17.6-alpine

WORKDIR /app

# Chown the directory
RUN chown -R node:node /app

# Copy over npm things
COPY --chown=node:node package* ./

# Install npm dependencies (dev and prod - sad!)
RUN npm ci

# Copy the dist folder from the build stage
COPY --from=build /app/dist /app/dist

# Set other docker config
ENV NODE_ENV production
EXPOSE 3000
USER node

# Set the command to run
CMD ["node", "dist/index.js"]
