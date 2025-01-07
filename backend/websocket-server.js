import { WebSocketServer } from 'ws';
import * as Y from 'yjs';
import { setupWSConnection } from 'y-websocket/bin/utils';

const wss = new WebSocketServer({ port: 1234 });

wss.on('connection', (ws, req) => {
  setupWSConnection(ws, req);
  console.log('New client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('Collaboration WebSocket server running on port 1234');