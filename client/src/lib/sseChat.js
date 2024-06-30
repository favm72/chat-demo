import { writable } from "svelte/store"
import { createEventSource } from "./sse"

export function createSSEChat() {
  const messages = writable([])

  function addMessage(message) {
    messages.update(msgs => [...msgs, message])
  }

  function sendMessage(message) {
    fetch(`${import.meta.env.VITE_API_HOST}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
  }

  createEventSource(addMessage)

  return {
    messages,
    sendMessage,
  }
}
