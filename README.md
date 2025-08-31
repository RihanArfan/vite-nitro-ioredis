# Build issue

Vite (rollup/rolldown) build issue (`pnpm vite build`) with ioredis which doesn't occur with Nitro CLI build (`pnpm nitro build`)

## Reproduction

1. Error
```ts
pnpm vite build
```

2. Success
```
pnpm nitro build
```

3. This AI generated monstrosity of a fix (ty cursor)
```ts
node -e "
const fs = require('fs');
const filePath = 'node_modules/.pnpm/@ioredis+commands@1.3.1/node_modules/@ioredis/commands/built/commands.json';

// Read original JSON data
let originalData;
try {
  const data = fs.readFileSync(filePath, 'utf8');
  originalData = JSON.parse(data);
} catch (e) {
  console.error('Failed to read commands.json', e);
}

// Create JS module
const jsContent = 'module.exports = ' + JSON.stringify(originalData, null, 4) + ';';
fs.writeFileSync('node_modules/.pnpm/@ioredis+commands@1.3.1/node_modules/@ioredis/commands/built/commands.js', jsContent);

// Update index.js to use JS module instead of JSON
const indexPath = 'node_modules/.pnpm/@ioredis+commands@1.3.1/node_modules/@ioredis/commands/built/index.js';
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace('require(\"./commands.json\")', 'require(\"./commands.js\")');
fs.writeFileSync(indexPath, indexContent);

console.log('✓ Fixed ioredis commands JSON issue');
"
```

and now vite's build works

```
pnpm vite build
```
