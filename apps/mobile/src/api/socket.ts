import Constants from 'expo-constants';
import { io, type Socket } from 'socket.io-client';

const API_URL = (Constants.expoConfig?.extra?.apiUrl as string | undefined) ?? 'http://localhost:4000';

let socket: Socket | null = null;

// TODO(M2): call this once the rider/driver has an auth token, and disconnect on sign-out.
export function connectSocket(token: string): Socket {
  socket?.disconnect();
  socket = io(API_URL, { auth: { token } });
  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}
