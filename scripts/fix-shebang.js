import fs from 'fs';
import path from 'path';

// Fix shebang for the compiled JS file
const distBinPath = path.join(process.cwd(), 'dist','src', 'bin', 'initra.js');

if (fs.existsSync(distBinPath)) {
  let content = fs.readFileSync(distBinPath, 'utf8');
  
  // Add shebang if it doesn't exist
  if (!content.startsWith('#!/usr/bin/env node')) {
    content = '#!/usr/bin/env node\n' + content;
    fs.writeFileSync(distBinPath, content);
    console.log('✅ Added shebang to dist/bin/initra.js');
  }
  
  // Make file executable (Unix/Linux/Mac)
  if (process.platform !== 'win32') {
    fs.chmodSync(distBinPath, 0o755);
    console.log('✅ Made dist/bin/initra.js executable');
  }
} else {
  console.error('❌ dist/bin/initra.js not found');
}