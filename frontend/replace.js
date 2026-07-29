const fs = require('fs');
const path = require('path');

function walkSync(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && filepath.endsWith('.js')) {
      callback(filepath);
    }
  }
}

['app', 'components'].forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  walkSync(fullDir, (filepath) => {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // We want to replace bg-white with bg-[#122a1f]
    // But be careful not to replace text-white
    const newContent = content
      .replace(/bg-white\b/g, 'bg-card')
      .replace(/bg-white\/([0-9]+)/g, 'bg-card/$1')
      .replace(/bg-gray-50/g, 'bg-background')
      .replace(/bg-gray-100/g, 'bg-muted')
      .replace(/text-gray-900/g, 'text-foreground')
      .replace(/text-gray-800/g, 'text-foreground')
      .replace(/text-gray-500/g, 'text-muted-foreground')
      .replace(/text-gray-600/g, 'text-muted-foreground')
      .replace(/border-gray-200/g, 'border-border');

    if (content !== newContent) {
      fs.writeFileSync(filepath, newContent, 'utf8');
      console.log(`Updated ${filepath}`);
    }
  });
});
