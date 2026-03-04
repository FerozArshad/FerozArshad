const fs = require('fs');
const path = require('path');

function copyDirectory(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// NextJSStandalone output paths
const standaloneDir = path.join(__dirname, '.next', 'standalone');
const serverStaticDir = path.join(standaloneDir, '.next', 'static');
const serverPublicDir = path.join(standaloneDir, 'public');

console.log('Copying static files to standalone directory...');

// Copy .next/static to .next/standalone/.next/static
copyDirectory(path.join(__dirname, '.next', 'static'), serverStaticDir);

// Copy public to .next/standalone/public
copyDirectory(path.join(__dirname, 'public'), serverPublicDir);

console.log('Static files copied successfully!');
