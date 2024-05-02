# Base Image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies (adjust if using yarn)
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port your Express app listens on
EXPOSE 3000
# Replace with your port number

# Start the application
CMD [ "npm", "start" ]
# Replace with your start command
