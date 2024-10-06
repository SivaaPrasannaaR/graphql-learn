# Use official Node.js base image
FROM node:18-alpine

# Set environment variables
# ENV NODE_ENV=production
# ENV MONGO_URL=mongodb://mongo:27017/productsdb
# ENV REDIS_HOST=redis
# ENV REDIS_PORT=6379
# ENV KAFKA_BROKER=kafka:9092
# ENV PORT=4002

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build TypeScript files (if necessary)
RUN npm run build

# Expose the application port
EXPOSE 4002

# Start the application
CMD ["npm", "run", "start"]
