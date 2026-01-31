# RechargeNow Project

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## How to Run

1. **Start Backend**
   Open a terminal and run:
   ```bash
   cd mernnode/app
   npm run dev
   ```
   *Expected Output*: "App listening at http://localhost:5000" and "MongoDB connected successfully"

2. **Start Frontend**
   Open a *new* terminal and run:
   ```bash
   cd mernnode/rechargenow
   npm run dev
   ```
   *Expected Output*: "Local: http://localhost:3001/"

3. **Access the App**
   Open your browser to `http://localhost:3001`

## Troubleshooting
- If you see "EADDRINUSE", it means the server is already running. Close open terminals or use Task Manager to stop Node.js processes.
- Ensure MongoDB Compass is open or `mongod` is running if you don't see "MongoDB connected successfully".