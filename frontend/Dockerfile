# Stage 1: Build the Next.js app
FROM node:current-alpine3.21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the static files
FROM node:current-alpine3.21 AS release

# Set the working directory for the static server
WORKDIR /app

# Install a lightweight static file server (e.g., serve)
RUN npm install -g serve

# Copy the exported static files from the build stage
COPY --from=build /app/out /app

# Expose the default port
EXPOSE 3000

# Use serve to serve the static files
CMD ["serve", "."]
