import { WebSocketServer } from 'ws';
import * as Y from 'yjs';
import { setupWSConnection } from 'y-websocket/bin/utils';

const wss = new WebSocketServer({ port: 1234 });

// Track active connections and rooms
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

wss.on('connection', (ws, req) => {
  const connectionId = Math.random().toString(36).substr(2, 9);
  const url = new URL(req.url, 'ws://localhost:1234');
  const roomName = url.pathname.slice(1);
  
  console.log('\n[New Connection]', {
    connectionId,
    roomName,
    totalConnections: wss.clients.size
  });

  connections.set(ws, {
    id: connectionId,
    room: roomName,
    timestamp: Date.now()
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
      
      // Force cleanup of Y.js awareness
      const doc = docs.get(room);
      if (doc) {
        doc.awareness?.removeStates([id]);
      }

      // Remove from room and connections
      const roomSet = rooms.get(room);
      if (roomSet) {
        roomSet.delete(id);
        if (roomSet.size === 0) {
          rooms.delete(room);
          docs.delete(room); // Also cleanup the Y.js doc
        }
      }
      connections.delete(ws);
    }
  });

  ws.on('error', (error) => {
    console.error('[WebSocket Error]:', error);
    ws.close();
  });
});

// Periodic cleanup of stale connections
setInterval(() => {
  const now = Date.now();
  connections.forEach((connection, ws) => {
    // Check if connection is still alive
    if (ws.readyState === ws.CLOSED) {
      ws.terminate();
    }
  });
}, 30000); // Run every 30 seconds

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server...');
  wss.clients.forEach((client) => {
    client.close();
  });
  process.exit(0);
});

console.log('Collaboration WebSocket server running on port 1234');

// Error handling for the WebSocket server
wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});