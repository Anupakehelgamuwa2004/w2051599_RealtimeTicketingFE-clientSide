# Ticket Management System

## Overview
This is a full-stack Ticket Management System built with Angular (Frontend) and a backend service. The application allows users to configure, start, stop, and monitor a ticket selling and buying process.

## Prerequisites
- Node.js (version 16 or higher)
- Angular CLI
- Java Development Kit (JDK) 11 or higher
- Maven or Gradle

## Frontend Setup

### Installation
1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
```bash
npm install
```

### Dependencies
Key dependencies include:
- Angular
- RxJS
- SockJS
- StompJS
- HttpClientModule

### Configuration
- Ensure backend server is running on `http://localhost:9090`
- WebSocket connection endpoint: `http://localhost:9090/chat`

## Features

### Configuration Page
- Set maximum ticket capacity
- Configure total tickets
- Define ticket release and retrieval rates
- Load previous configurations

### Start/Stop Controls
- Start and stop ticket selling/buying threads
- Fetch current configuration

### Real-time Ticket Monitoring
- WebSocket integration for live updates
- Display ticket addition and purchase events

## Running the Application

### Frontend
```bash
ng serve
```
- Application will be available at `http://localhost:4200`

### Backend
- Ensure your Spring Boot backend is running on port 9090
- Required endpoints:
  - `/config/update` (POST): Update configuration
  - `/config/get` (GET): Retrieve current configuration
  - `/config/start` (POST): Start ticket threads
  - `/config/stop` (POST): Stop ticket threads

## Endpoints and API Interactions

### Configuration Update
- **Endpoint**: `http://localhost:9090/config/update`
- **Method**: POST
- **Payload**: 
```json
{
  "maxTicketCapacity": 100,
  "totalTickets": 50,
  "ticketReleaseRate": 1000,
  "customerRetrievalRate": 1000
}
```

### Start/Stop Threads
- **Start Endpoint**: `http://localhost:9090/config/start`
- **Stop Endpoint**: `http://localhost:9090/config/stop`

## WebSocket Communication
- Subscribes to `/topic/tickets`
- Receives real-time updates about:
  - Ticket additions
  - Ticket purchases

## Troubleshooting

### Common Issues
1. **Connection Refused**
   - Verify backend server is running
   - Check CORS settings
   - Confirm port configuration

2. **WebSocket Connection Failure**
   - Ensure SockJS and StompJS are correctly imported
   - Verify WebSocket endpoint URL

### Logging
- Frontend: Check browser console
- Backend: Review server logs

## Development Notes

### Component Structure
- `BaseComponent`: Main container
- `ConfigPageComponent`: Configuration settings
- `StartStopComponent`: Control thread execution
- `TotalTicketComponent`: Real-time ticket monitoring

### Styling
- Responsive design
- Custom CSS with flexibility
- Gradient and hover effects

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request



## Contact
[email : anupakehel8403@gmail.com]
