const { spawn } = require('child_process')
const os = require('os')

// Function to get the local IP address
function getLocalIP () {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName].find(alias => alias.family === 'IPv4' && !alias.internal)
    if (iface) {
      return iface.address
    }
  }
  return 'localhost'
}

const myIP = getLocalIP()
const command = 'shopify'
const args = ['theme', 'dev', '-s=patq-dev-store', '--theme-editor-sync', `--host=${myIP}`, '--port=7131']

const process = spawn(command, args, { stdio: 'inherit', shell: true })

process.on('error', (error) => {
  console.error(`Error: ${error}`)
})

process.on('exit', (code, signal) => {
  console.log(`Process exited with code ${code}, signal ${signal}`)
})
