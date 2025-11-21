/*import fs from 'fs';
import readlinePromises from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';

// ---------- SORT FUNCTION ----------
function sortedPersons(persons) {
    const sorteDpersons = {};

    persons.forEach(element => {
        const [firstName, lastName, dateOfBirth] = element.split('_');
        const [dd, mm, yyyy] = dateOfBirth.split('/');

        const fullName = `${firstName} ${lastName}`;

        if (!sorteDpersons[yyyy]) sorteDpersons[yyyy] = {};
        if (!sorteDpersons[yyyy][mm]) sorteDpersons[yyyy][mm] = {};
        if (!sorteDpersons[yyyy][mm][dd]) sorteDpersons[yyyy][mm][dd] = [];

        sorteDpersons[yyyy][mm][dd].push(fullName);
    });

    return sorteDpersons;
}

// ---------- READ USER INPUT FOR FILE PATH ----------
async function main() {
    const rl = readlinePromises.createInterface({ input, output });

    try {
        const path = await rl.question("Enter path to the .txt file: ");

        if (!path.endsWith('.txt')) {
            console.error("Error: File must be a .txt file.");
            rl.close();
            return;
        }

        // Read file
        const data = fs.readFileSync(path, 'utf8'); // sync read is fine here

        // Convert file contents into array of person strings
        const persons = data
            .split('\n')
            .map(line => line.trim());*/
