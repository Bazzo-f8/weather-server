FROM node:latest

WORKDIR /app

# Copy only the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Command to run the application
CMD ["npx", "ts-node", "src/index.js"]
