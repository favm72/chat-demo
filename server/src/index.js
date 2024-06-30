const express = require("express")
const cors = require("cors")
const { Server } = require("socket.io")
const http = require("http")
const app = express()

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

io.on("connection", socket => {
  console.log("a user connected")
  socket.on("event", msg => {
    console.log("event", msg)
    io.emit("event", msg)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const port = 3001
const clients = []
let sendEvent = data => {
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}

app.get("/", (req, res) => {
  res.json({ message: "server running" })
})

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  clients.push({ req, res })

  req.on("close", () => {
    res.end()
  })
})

app.post("/message", (req, res) => {
  console.log("message received:", req.body)
  sendEvent(req.body)
  res.json({ status: "ok" })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
