const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'src'), { recursive: true });

for (const file of ['index.html']) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

for (const file of ['main.js', 'index.css']) {
  fs.copyFileSync(path.join(root, 'src', file), path.join(dist, 'src', file));
}


console.log('Built static hero into dist/');
