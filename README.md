# Issue Synchronization System - Frontend

This project is a client side for issues backend service that synchronizes issues between Plane and GitHub. In this UI it gives a prominent button to start sync and also shows progress and current status using Websockets.

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Technologies Used](#technologies-used)

---

## Features

- **Sync Service:** Synchronizes GitHub issues with Plane workspaces.
- **Real-time Updates:** Shows broadcasted sync progress from server via WebSocket (Socket.IO Client).

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Saurabhkmr98/plane-issues-sync-frontend.git
cd plane-issues-sync-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and configure the variables by referencing to `.env.example` file:

### 3. Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000/`.

---

## Technologies Used

- **React.js**: A Javascript Framework
- **Socket.IO Client**: Real-time, event-based communication for broadcasting sync progress.
- **Tanstack React Query**: For making API calls

---

## Conclusion

This frontend client a simple UI to interact with plane-issues-backend-service

Feel free to reach out for further details or to contribute to the project.

---

### Author

Saurabh Kumar  
saurabhkmr0241@gmail.com

---
