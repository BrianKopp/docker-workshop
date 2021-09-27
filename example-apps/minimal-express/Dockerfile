# This example uses an alpine base image that specifies the major node version as the current LTS version.
# Over time, this base version will drift since they will continue to deploy patch updates with security fixes.
# For production environments, it is best practice to pin to a specific SHA
FROM node:14-alpine

# Set the working directory for your app
WORKDIR /app

# Copy over package info
COPY package* ./

# Install production dependencies
RUN npm ci --production

# Copy over other source code
# Unnecessary files are excluded by the .dockerignore file
COPY . .

# Change ownership of the entire directory to node
RUN chown -R node:node /app

# Specify that you want to use node user
USER node

# Set the NODE_ENV to production
ENV NODE_ENV production

# expose a port
EXPOSE 3000

# Set the startup script
CMD ["node", "index.js"]
