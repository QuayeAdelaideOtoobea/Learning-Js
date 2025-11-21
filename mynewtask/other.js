const fs = require('fs');

function sortedPersons(arr) {
  const r = {};
  for (const s of arr) {
    const [f, l, dob] = s.split('_');
    const [d, m, y] = dob.split('/');
    (r[y] ??= {})[m] ??= {};
    (r[y][m][d] ??= []).push(`${f} ${l}`);
  }
  return r;
}

const file = process.argv[2];
if (!file) return console.error("Usage: node app.js <file.txt>");

const persons = fs.readFileSync(file, 'utf8').trim().split('\n');
console.log(JSON.stringify(sortedPersons(persons), null, 2));
