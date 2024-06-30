export function createEventSource(onMessage) {
  const maxReconnectAttempts = 10
  let reconnectAttempts = 0
  const eventSource = new EventSource(`${import.meta.env.VITE_API_HOST}/events`)

  eventSource.onopen = () => {
    console.log("EventSource connected")
    reconnectAttempts = 0
  }

  eventSource.onmessage = event => {
    const message = JSON.parse(event.data)
    onMessage(message)
  }

  eventSource.onerror = error => {
    console.error("EventSource failed:", error)

    if (
      eventSource.readyState === EventSource.CLOSED ||
      eventSource.readyState === EventSource.CONNECTING
    ) {
      if (reconnectAttempts < maxReconnectAttempts) {
        setTimeout(() => {
          reconnectAttempts++
          createEventSource()
        }, 5000)
      } else {
        console.error("EventSource failed permanently")
      }
    }
  }
}
