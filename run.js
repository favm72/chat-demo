const { spawn } = require("child_process")

function getChild(path, name) {
  const child = spawn(`cd ${path} && yarn dev`, { shell: true })
  child.stdout.on("data", data => {
    console.log(`[${name}] stdout: ${data}`)
  })
  child.stderr.on("data", data => {
    console.error(`[${name}] stderr: ${data}`)
  })
  child.on("close", code => {
    console.log(`[${name}] child process exited with code ${code}`)
  })
  return child
}

const children = [getChild("server", "server"), getChild("client", "client")]

process.on("SIGINT", () => {
  children.forEach(child => child.kill())
  process.exit()
})
