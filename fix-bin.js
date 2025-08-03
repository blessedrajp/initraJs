import fs from 'fs';
import path from 'path';

const fixBinFile = () => {
  const binPath = path.join(process.cwd(), 'dist', 'src', 'bin', 'initra.js');
  
  console.log('🔍 Looking for:', binPath);
  
  if (fs.existsSync(binPath)) {
    console.log('✅ Found bin file');
    
    let content = fs.readFileSync(binPath, 'utf8');
    
    // Add shebang if it doesn't exist
    if (!content.startsWith('#!/usr/bin/env node')) {
      content = '#!/usr/bin/env node\n' + content;
      fs.writeFileSync(binPath, content);
      console.log('✅ Added shebang');
    } else {
      console.log('✅ Shebang already exists');
    }
    
    // Make executable on Unix systems
    if (process.platform !== 'win32') {
      try {
        fs.chmodSync(binPath, 0o755);
        console.log('✅ Made file executable');
      } catch (error) {
        console.log('⚠️  Could not make executable:', error.message);
      }
    }
    
    console.log('🎉 Bin file is ready at:', binPath);
  } else {
    console.error('❌ Bin file not found at:', binPath);
    console.log('📁 Checking dist structure...');
    
    try {
      const distContents = fs.readdirSync(path.join(process.cwd(), 'dist'));
      console.log('dist contents:', distContents);
      
      if (distContents.includes('src')) {
        const srcContents = fs.readdirSync(path.join(process.cwd(), 'dist', 'src'));
        console.log('dist/src contents:', srcContents);
        
        if (srcContents.includes('bin')) {
          const binContents = fs.readdirSync(path.join(process.cwd(), 'dist', 'src', 'bin'));
          console.log('dist/src/bin contents:', binContents);
        }
      }
    } catch (error) {
      console.error('Error checking dist structure:', error.message);
    }
  }
};

fixBinFile();