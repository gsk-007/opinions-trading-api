# Opinions Trading API

Welcome to the Opinions Trading API! This project provides a robust API for managing and analyzing trading opinions, facilitating seamless integration with trading platforms and applications.

## Features

- **Comprehensive API**: Manage trading opinions with ease.
- **Scalable Architecture**: Built to handle high volumes of data efficiently.
- **Extensible Design**: Easily integrate with various trading platforms.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Docker**: For containerized setup, install Docker from [docker.com](https://www.docker.com/).

### Cloning the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/gsk-007/opinions-trading-api.git
```

Navigate to the project directory:

```bash
cd opinions-trading-api
```

### Environment Configuration

Duplicate the `.env.example` file and rename it to `.env`. Update the environment variables as needed to match your configuration.

### Running the Application

#### Using Docker

1. **Build and Start Containers**: Use Docker Compose to build and start the containers.

   ```bash
   docker-compose up --build
   ```

2. **Access the API**: Once the containers are running, the API will be accessible at `http://localhost:5000`.
3. **Seed Command** : `docker-compose exec app npm run seed`

#### Without Docker

1. **Install Dependencies**: Install the necessary packages.

   ```bash
   npm install
   ```

2. **Start the Application**: Launch the application.

   ```bash
   npm start
   # or npm run dev to start the dev server
   ```

3. **Access the API**: The API will be running at `http://localhost:5000`.

### Seeding the Database

To seed the database with initial data, run the following command:

```bash
npm run seed
```

This command will populate the database with predefined data essential for the application's functionality.

## Folder Structure

The project's folder structure is organized as follows:

```
opinions-trading-api/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env.example
├── .gitignore
├── .prettierrc
├── Dockerfile.dev
├── docker-compose.yaml
├── package.json
└── README.md
```

- **`src/`**: Contains the source code.
  - **`controllers/`**: Handles incoming requests and responses.
  - **`models/`**: Defines data schemas and interacts with the database.
  - **`routes/`**: Manages API endpoints and routing.
  - **`utils/`**: Includes utility functions and helpers.
- **`.env.example`**: Sample environment configuration file.
- **`.gitignore`**: Specifies files and directories to be ignored by Git.
- **`.prettierrc`**: Configuration file for code formatting.
- **`Dockerfile.dev`**: Dockerfile for development environment setup.
- **`docker-compose.yaml`**: Docker Compose configuration file.
- **`package.json`**: Manages project dependencies and scripts.
- **`README.md`**: Project documentation.


---
