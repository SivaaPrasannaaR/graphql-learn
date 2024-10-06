    Microservice Project with Docker, MongoDB, and Redis

    This project demonstrates how to run a microservice architecture using Docker Compose. It includes:

    - User Service
    - Product Service
    - Apollo Gateway
    - MongoDB (common database)
    - Redis (common caching system)

    Prerequisites
    Before you begin, ensure you have the following installed:

    - Docker
    - Docker Compose

    Project Structure
    The project has the following directory structure:

    .
    ├── docker-compose.yml           # Defines services for user-service, product-service, and Apollo Gateway
    ├── docker-compose-db.yml        # Defines MongoDB and Redis services
    ├── user-service/                # User service source code
    ├── product-service/             # Product service source code
    ├── gateway/                     # Apollo Gateway source code

    Step-by-Step Setup
    1. Clone the Repository

    git clone <repository-url>
    cd <project-directory>

    2. Set Up MongoDB and Redis (docker-compose-db.yml)
    The first step is to bring up the MongoDB and Redis services, which will be shared by all microservices.

    docker-compose -f docker-compose-db.yml up -d

    This command will:

    - Pull the MongoDB and Redis images.
    - Run MongoDB on localhost:27017.
    - Run Redis on localhost:6379.

    3. Create a Docker Network
    To allow all services to communicate with MongoDB and Redis, you need to create a shared Docker network:

    docker network create backend

    This network will be used by both your MongoDB/Redis containers and the microservices (User, Product, and Gateway).

    4. Build and Start the Microservices (docker-compose.yml)
    Once MongoDB and Redis are running, start the User Service, Product Service, and Apollo Gateway:

    docker-compose -f docker-compose.yml up --build

    This command will:

    - Build the Docker images for the User Service, Product Service, and Apollo Gateway.
    - Start the services:
        - User Service on localhost:4001.
        - Product Service on localhost:4002.
        - Apollo Gateway on localhost:4000.

    5. Access the Services

    - Apollo Gateway: You can access the gateway at http://localhost:4000/. This will provide a unified API for both the User and Product services.
    - User Service: Access the user service directly at http://localhost:4001/.
    - Product Service: Access the product service directly at http://localhost:4002/.

    6. View MongoDB Data
    To view the data stored in MongoDB, you can use MongoDB Compass or connect via CLI:

    - MongoDB URI: mongodb://localhost:27017

    The databases for the services are:

    - usersdb: For User Service data.
    - productdb: For Product Service data.

    7. Stop the Services
    To stop all running services, use:

    docker-compose -f docker-compose.yml down

    To stop the MongoDB and Redis services, use:

    docker-compose -f docker-compose-db.yml down

    8. Clean Up
    If you want to remove all containers, networks, and volumes (careful, this will delete all data):

    docker-compose -f docker-compose.yml down -v
    docker-compose -f docker-compose-db.yml down -v
    docker network rm backend

    Additional Notes
    - Network: All services communicate over a shared Docker network called backend. This network must exist before running the services.
    - Volume Usage: By default, the MongoDB and Redis containers use volumes for data persistence. This can be customized or removed if necessary.
