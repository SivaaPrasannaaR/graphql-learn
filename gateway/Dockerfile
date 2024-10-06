FROM node:16-alpine

# Set environment variables
# ENV NODE_ENV=production
# ENV REDIS_HOST=redis
# ENV REDIS_PORT=6379
# ENV KAFKA_BROKER=kafka:9092
# ENV PORT=4000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]
