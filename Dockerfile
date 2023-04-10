# Use a Node.js runtime as the base image
#CMd : docker build -t offboarding-associate-ui .
FROM node:18-alpine
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Build the production version of the application
RUN npm run build
# Set the command to start the application
CMD ["npm", "start"]
# build
# FROM node:18.12.1-alpine as build-stage
# COPY --from=module-install-stage /app/node_modules/ /app/node_modules
# WORKDIR /app
# COPY . .
# RUN yarn build


# Set the command to start the application
CMD ["npm", "start"]

# # serve
# FROM node:18.0.0-alpineclear

