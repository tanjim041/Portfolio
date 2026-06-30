const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// File paths
const dataPath = path.join(__dirname, 'data', 'portfolio.json');
const templatePath = path.join(__dirname, 'views', 'index.ejs');
const outputPath = path.join(__dirname, 'index.html');

console.log('Building static site...');

// Read data
let data;
try {
  const rawData = fs.readFileSync(dataPath, 'utf8');
  data = JSON.parse(rawData);
} catch (error) {
  console.error('Error reading portfolio.json:', error.message);
  process.exit(1);
}

// Render EJS
ejs.renderFile(templatePath, { data }, { root: path.join(__dirname, 'views') }, (err, str) => {
  if (err) {
    console.error('Error rendering EJS:', err);
    process.exit(1);
  }

  // Write to index.html
  try {
    fs.writeFileSync(outputPath, str, 'utf8');
    console.log(`Successfully built ${outputPath}`);
  } catch (writeErr) {
    console.error('Error writing index.html:', writeErr.message);
    process.exit(1);
  }
});
