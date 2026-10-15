import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.mp4', 'video/mp4'],
  ['.webp', 'image/webp'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
]);

if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error(`PORT inválida: ${process.env.PORT}`);

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method ?? '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method Not Allowed');
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad Request');
    return;
  }
  if (pathname.includes('\0') || pathname.split('/').some((part) => part.startsWith('.'))) {
    response.writeHead(404).end('Not Found');
    return;
  }
  let filePath = resolve(root, `.${pathname}`);
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  try {
    let stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      filePath = resolve(filePath, 'index.html');
      stat = await fs.stat(filePath);
    }
    const realPath = await fs.realpath(filePath);
    if (realPath !== root && !realPath.startsWith(`${root}${sep}`)) throw new Error('Path outside root');
    const headers = {
      'Content-Type': contentTypes.get(extname(realPath).toLowerCase()) ?? 'application/octet-stream',
      'Content-Length': stat.size,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
    };
    response.writeHead(200, headers);
    if (request.method === 'HEAD') response.end();
    else createReadStream(realPath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found');
  }
});

server.listen(port, '127.0.0.1', () => console.log(`Relatório Vivo disponível em http://127.0.0.1:${port}`));
