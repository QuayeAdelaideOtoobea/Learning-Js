const fs = require('fs');
const readline = require('readline');


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
//---------- READ USER INPUT FOR FILE PATH ----------
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter path to the .txt file: ", function(path) {
    if (!path.endsWith('.txt')) {
        console.error("Error: File must be a .txt file.");
       
 rl.close();
        return;
    }

    // Read file
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error("Could not read file:", err.message);
            rl.close();
            return;
        }

        // Convert file contents into array of person strings
        const persons = data
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);  // remove empty lines

        const result = sortedPersons(persons);
        console.log(JSON.stringify(result, null, 2));

        rl.close();
    });
});
