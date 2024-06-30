import { writable } from "svelte/store"
import { createSocket } from "./socket"

export function createSocketChat() {
  const messages = writable([])

  function addMessage(message) {
    messages.update(msgs => [...msgs, message])
  }

  const socket = createSocket(addMessage)

  function sendMessage(message) {
    socket.emit("event", message)
  }

  return {
    messages,
    sendMessage,
  }
}
