# Hypermode Knowledge Graph + AI Challenge

## ResearchBridge

ResearchBridge is an innovative research platform developed for the Hypermode Knowledge Graph + AI Challenge. It empowers researchers with real-time collaboration tools, advanced citation management, and AI-powered research assistance.

![Project Screenshot](image.png)
![how it works](image-1.png)

![Collaborative text editor](image-3.png)
![AI-powered research assistant integrated with modus](image-4.png)
## Key Features

- Real-time collaborative text editor with multi-user support
- Advanced citation network visualization
- AI-powered research assistant integration
- WebSocket-based real-time communication
- Modern, intuitive user interface with exceptional UX design
- Seamless document management and version control

![profile page](image-2.png)

## Technical Requirements

Before running the project, ensure you have:
- Node.js (v14 or higher)
- Go (v1.16 or higher)
- npm or yarn package manager

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
```

### Backend Setup
```bash
cd backend
npm install
```

### Citation Network Setup
```bash
cd citation-network
go mod tidy
```

## Development Server

Run the following services in separate terminal windows:

### 1. Frontend Development Server
```bash
cd frontend
npm run dev
```
Access the application at `http://localhost:3000`

### 2. Backend API Server
```bash
cd backend
npm run start
```
API endpoints available at `http://localhost:8000`

### 3. WebSocket Server
```bash
cd backend
node websocket-server.js
```
WebSocket connections at `ws://localhost:8080`

### 4. Citation Network Service
```bash
cd citation-network
go run .
```
Citation service running at `http://localhost:9000`

## Development Notes
- Run each service in a separate terminal for better log monitoring
- Ensure all services are running simultaneously for full functionality
- Monitor the console for any potential errors or warnings

## Project Status
This project was developed as part of the Hypermode Knowledge Graph + AI Challenge. We welcome feedback and suggestions for improvement.