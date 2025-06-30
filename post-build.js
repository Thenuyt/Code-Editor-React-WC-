const fs = require('fs');
const path = require('path');
const bundleFolderName="Elements";
const webComponentFileName ="genetom-code-editor";
const buildDir = path.join(__dirname, 'build', 'static');
const elementsDir = path.join(__dirname, bundleFolderName);

// Ensure the Elements directory exists
if (!fs.existsSync(elementsDir)) {
    fs.mkdirSync(elementsDir);
}

// Helper function to copy and rename files
function copyAndRenameFile(src, dest) {
    fs.copyFileSync(src, dest);
}

// Function to rename and move files
function renameFiles(srcDir, destDir, newFileName) {
    fs.readdirSync(srcDir).forEach(file => {
        if (file.endsWith('.css') || file.endsWith('.js')) {
            copyAndRenameFile(
                path.join(srcDir, file),
                path.join(destDir, newFileName + path.extname(file))
            );
        }
    });
}

// Copy and rename CSS files
const cssDir = path.join(buildDir, 'css');
if (fs.existsSync(cssDir)) {
    renameFiles(cssDir, elementsDir, webComponentFileName); // Renames to main.css
}

// Copy and rename JS files
const jsDir = path.join(buildDir, 'js');
if (fs.existsSync(jsDir)) {
    renameFiles(jsDir, elementsDir, webComponentFileName); // Renames to main.js
}

console.log('Files copied and renamed in Elements folder.');
