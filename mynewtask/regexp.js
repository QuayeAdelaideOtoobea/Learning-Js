const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

// -----------------------
// Ask user for file path
// -----------------------
function askFilePath() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question("Enter the path to your .txt file: ", answer => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// -----------------------
// Load file and clean lines
// -----------------------
async function loadPersonsFromFile(filePath) {
    if (path.extname(filePath) !== ".txt") {
        throw new Error("Only .txt files are allowed!");
    }

    const fileData = await fs.readFile(filePath, "utf8");

    return fileData
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
}

// -----------------------
// Sort persons by date
// Supports ANY date format JS can read:
// "12/05/2000", "May 5 2000", "5 April 1999", etc.
// -----------------------
function sortedPersons(persons) {
    const sorted = {};
    const regex = /^(\w+)_(\w+)_(.+)$/; // capture everything after 2 underscores as date

    persons.forEach(element => {
        const match = element.match(regex);
        if (!match) return; // skip invalid lines

        const firstName = match[1];
        const lastName = match[2];
        const dateString = match[3];

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return; // skip invalid date formats

        // Convert to YYYY-MM-DD for sorting
        const yyyy = String(date.getFullYear());
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        const fullName = `${firstName} ${lastName}`;

        if (!sorted[yyyy]) sorted[yyyy] = {};
        if (!sorted[yyyy][mm]) sorted[yyyy][mm] = {};
        if (!sorted[yyyy][mm][dd]) sorted[yyyy][mm][dd] = [];

        sorted[yyyy][mm][dd].push(fullName);
    });

    return sorted;
}

// -----------------------
// Main function
// -----------------------
async function main() {
    try {   
        const filePath = await askFilePath();
        const persons = await loadPersonsFromFile(filePath);
        const result = sortedPersons(persons);
        console.log(JSON.stringify(result, null, 2));
    } catch (err) {
        console.error("Error:", err.message);
    }                                                                                                                                                                                                                   
}

main();

/*
async function main() {
    try {
        const filePath = await askFilePath();
        const persons = await loadPersonsFromFile(filePath);
        const result = sortedPersons(persons);

        await fs.writeFile("sorted_output.json", JSON.stringify(result, null, 2), "utf8");
        console.log("Done! Output written to sorted_output.json");
    }
}
main();
*/
