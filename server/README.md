# Job Search Server

Welcome to the Job Search Server! This server-side application provides the backend functionality for the Job Search web application, handling user authentication, job listings, and other related operations.

## Getting Started

These instructions will help you set up the server on your local machine for development and testing purposes.

### Prerequisites

Before getting started, ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alexanderclayton/JobSearch.git
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a .env file in the root of the server directory and define the necessary environment variables.

5. Build the server:
   This project requires typescript compliation by running the following command:

   ```bash
   npm run build
   ```

### Usage

To start the server, run:

```bash
npm run start
```

For development, the project leverages the concurrently and nodemon packages to compile typescript files and start the server in development mode, listening for any changes to files, and recompile files, restart server automatically.

To start the server in development mode, run:

```bash
npm run dev
```

By default, the server will listen on port 5000. You can modify this in the `server.ts` file or through environment variables.

### Endpoints

The server provides the following endpoints:

..\* `POST /api/auth/login`: User login
..\* `POST /api/users/add_user`: Create user document in MongoDB
..\* `PUT /api/users/update_user`: Update user document in MongoDB
..\* `DELETE /api/users/delete_user`: Delete user document in MongoDB
..\* `POST /api/jobs/add_job`: Create job document in MongoDB
..\* `PUT /api/jobs/update_job`: Update job document in MongoDB
..\* `DELETE /api/jobs/delete_job`: Delete job document in MongoDB
..\* `GET /api/jobs/`: Retrieve multiple job documents from MongoDB
..\* `GET /api/jobs/:id`: Retrieve single job document from MongoDB
..\* `POST /api/applications/add_application`: Create application document in MongoDB
..\* `PUT /api/applications/add_application`: Update application document in MongoDB
..\* `DELETE /applications/add_application`: Delete application document in MongoDB
..\* `GET /api/applications/`: Retrieve multiple application documents from MongoDB
..\* `GET /api/applications/:id`: Retrieve single application document from MongoDB

For detailed information on each endpoint, refer to the API Documentation (COMING SOON!).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License
