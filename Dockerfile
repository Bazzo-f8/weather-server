# Use a recent Node.js LTS image for the builder stage
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file (package-lock.json or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files (excluding node_modules)
COPY . .

# Build the project (assuming tsc for compiling index.ts)
RUN npm install -g typescript  # Install tsc globally if not already installed
RUN tsc index.ts  # Compile index.ts using tsc

# Use a smaller Node.js image for the production stage
FROM node:18-alpine

# Copy only the production-ready files from the builder stage
# Assuming the compiled JavaScript is in the same directory (.)
COPY --from=builder . .

# Expose the port your application listens on (if applicable)
EXPOSE 3000

# Start the application (assuming the compiled file is index.js)
CMD [ "node", "index.js" ]
