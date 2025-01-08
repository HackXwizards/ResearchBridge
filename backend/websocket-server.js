import { WebSocketServer } from 'ws';
import * as Y from 'yjs';
import { setupWSConnection } from 'y-websocket/bin/utils';

const wss = new WebSocketServer({ port: 1234 });

// Track active connections and rooms with timestamps
const rooms = new Map();
const connections = new Map();
const docs = new Map();

// Debug function to log room status
const logRoomStatus = (roomName) => {
  const room = rooms.get(roomName);
  console.log('\n=== Room Status ===');
  console.log(`Room: ${roomName}`);
  console.log(`Total connections: ${room ? room.size : 0}`);
  if (room) {
    console.log('Active connections:', Array.from(room));
  }
  console.log('==================\n');
};

// More aggressive cleanup interval (every 5 seconds)
const cleanup = setInterval(() => {
  const now = Date.now();
  
  // Cleanup stale connections
  connections.forEach((connection, ws) => {
    if (!ws.isAlive) {
      ws.terminate();
      connections.delete(ws);
      return;
    }
    
    // Check if connection is too old (> 30 seconds without activity)
    if (now - connection.timestamp > 30000) {
      ws.terminate();
      connections.delete(ws);
      return;
    }
    
    ws.isAlive = false;
    ws.ping();
  });

  // Cleanup empty rooms and their docs
  rooms.forEach((connections, roomName) => {
    if (connections.size === 0) {
      const doc = docs.get(roomName);
      if (doc) {
        doc.destroy();
        docs.delete(roomName);
      }
      rooms.delete(roomName);
    }
  });
}, 5000);

wss.on('connection', (ws, req) => {
  const connectionId = Math.random().toString(36).substr(2, 9);
  const url = new URL(req.url, 'ws://localhost:1234');
  const roomName = url.pathname.slice(1);
  
  connections.set(ws, {
    id: connectionId,
    room: roomName,
    timestamp: Date.now()
  });

  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
    // Update timestamp on activity
    const connection = connections.get(ws);
    if (connection) {
      connection.timestamp = Date.now();
    }
  });

  console.log('\n[New Connection]', {
    connectionId,
    roomName,
    totalConnections: wss.clients.size
  });

  if (!rooms.has(roomName)) {
    rooms.set(roomName, new Set());
  }
  rooms.get(roomName).add(connectionId);

  // Store doc reference
  if (!docs.has(roomName)) {
    docs.set(roomName, new Y.Doc());
  }

  setupWSConnection(ws, req);
  
  logRoomStatus(roomName);

  ws.on('close', () => {
    const connection = connections.get(ws);
    if (connection) {
      const { id, room } = connection;
      
      // Improved cleanup sequence
      const roomSet = rooms.get(room);
      const doc = docs.get(room);
      
      if (doc) {
        // Clean up awareness states immediately
        doc.awareness?.removeStates([id]);
        
        // Only destroy doc if this was the last connection
        if (roomSet?.size === 1) {
          doc.destroy();
          docs.delete(room);
          rooms.delete(room);
        }
      }

      // Remove from room set
      if (roomSet) {
        roomSet.delete(id);
      }
      
      // Clear connection
      connections.delete(ws);
    }
    
    // Ensure socket is properly terminated
    ws.terminate();
  });

  ws.on('error', (error) => {
    console.error('[WebSocket Error]:', error);
    ws.close();
  });
});

// Cleanup on server shutdown
process.on('SIGINT', () => {
  clearInterval(cleanup);
  console.log('Shutting down WebSocket server...');
  wss.clients.forEach((client) => {
    client.terminate();
  });
  // Cleanup all docs
  docs.forEach(doc => doc.destroy());
  docs.clear();
  rooms.clear();
  connections.clear();
  process.exit(0);
});

console.log('Collaboration WebSocket server running on port 1234');

// Error handling for the WebSocket server
wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});