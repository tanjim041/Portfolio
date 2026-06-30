const fs = require('fs');
const file = 'data/portfolio.json';
let data = fs.readFileSync(file, 'utf8');
data = data.replace(/"\/images\//g, '"./public/images/');
fs.writeFileSync(file, data);
console.log('Updated portfolio.json paths.');
