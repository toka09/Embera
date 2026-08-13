import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'dist')
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg' }

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
    const requested = normalize(join(root, pathname === '/' ? 'index.html' : pathname))
    const file = requested.startsWith(root) && extname(pathname) ? requested : join(root, 'index.html')
    const body = await readFile(file).catch(() => readFile(join(root, 'index.html')))
    response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' })
    response.end(body)
  } catch {
    response.writeHead(500)
    response.end('Preview server error')
  }
}).listen(4173, '127.0.0.1')
