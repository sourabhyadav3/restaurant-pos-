const fs = require('fs');
const path = 'd:/KT projects/restaurant/src/pages/GuestFolio.jsx';
let content = fs.readFileSync(path, 'utf-8');

// The problematic section starts with <td className="px-8 py-5 text-right"> after the </div> on line 268
// but there's another one on line 259 which is good.

const lines = content.split('\n');
// We want to keep lines up to 268 (0-indexed 267) and then skip to 281 (0-indexed 280)
const newLines = [...lines.slice(0, 268), ...lines.slice(280)];

fs.writeFileSync(path, newLines.join('\n'));
console.log('Fixed GuestFolio.jsx');
