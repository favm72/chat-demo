import { io } from "socket.io-client"

export function createSocket(onEvent) {
  const socket = io(import.meta.env.VITE_SOCKET_HOST, {
    reconnectionDelayMax: 10000,
    reconnection: true,
    reconnectionAttempts: 10,
  })

  socket.on("connect", () => {
    console.log("socket connected")
  })

  socket.on("event", data => {
    console.log("socket event", data)
    onEvent(data)
  })

  return socket
}
