// Genera uno snapshot HTML statico di ogni pagina principale dentro dist/,
// così i crawler che non eseguono JavaScript (molti bot AI, alcuni motori
// di ricerca) leggono il contenuto reale invece della shell SPA vuota.
// Il browser normale continua a idratare/ricostruire la pagina via React.
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const routes = ['/', '/progetto', '/ai-data-center', '/filiera-del-dato', '/chi-siamo']

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.php': 'text/plain',
}

function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0])
      let filePath = path.join(distDir, urlPath)

      if (!existsSync(filePath) || urlPath.endsWith('/')) {
        filePath = path.join(distDir, 'index.html')
      }

      try {
        const data = await readFile(filePath)
        const ext = path.extname(filePath)
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
        res.end(data)
      } catch {
        res.writeHead(404)
        res.end('Not found')
      }
    })
    server.listen(port, () => resolve(server))
  })
}

async function main() {
  if (!existsSync(distDir)) {
    console.error('dist/ non trovata — esegui prima "npm run build".')
    process.exit(1)
  }

  const port = 4321
  const server = await startServer(port)
  const baseUrl = `http://localhost:${port}`

  // Alcuni ambienti (es. sandbox di sviluppo) pre-installano Chromium in un
  // percorso fisso invece che nella cache di Playwright: se presente, lo usiamo.
  const localChromium = '/opt/pw-browsers/chromium'
  const browser = await chromium.launch(
    existsSync(localChromium) ? { executablePath: localChromium } : {},
  )
  const page = await browser.newPage()

  for (const route of routes) {
    const url = `${baseUrl}${route}`
    await page.goto(url, { waitUntil: 'networkidle' })
    // Lascia il tempo alle animazioni d'ingresso di montare il contenuto nel DOM
    await page.waitForTimeout(300)

    const html = await page.content()

    const outDir = route === '/' ? distDir : path.join(distDir, route.slice(1))
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, 'index.html'), html, 'utf-8')
    console.log(`✓ Pre-renderizzata ${route || '/'} → ${path.relative(distDir, outDir)}/index.html`)
  }

  await browser.close()
  server.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
