const fs = require("fs");
const path = require("path");

// Function to read persons from .txt file
function loadPersonsFromFile(filePath) {
    // Allow only .txt files
    if (path.extname(filePath) !== ".txt") {
        throw new Error("Only .txt files are allowed!");
    }

    const fileData = fs.readFileSync(filePath, "utf8");
    return fileData
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);
}

// Your sorting function
function sortedPersons(persons) {
    const sorted = {};

    persons.forEach(element => {
        const [firstName, lastName, dateOfBirth] = element.split("_");
        const [dd, mm, yyyy] = dateOfBirth.split("/");

        const fullName = `${firstName} ${lastName}`;

        if (!sorted[yyyy]) sorted[yyyy] = {};
        if (!sorted[yyyy][mm]) sorted[yyyy][mm] = {};
        if (!sorted[yyyy][mm][dd]) sorted[yyyy][mm][dd] = [];

        sorted[yyyy][mm][dd].push(fullName);
    });

    return sorted;
}

// --- RUN ----
try {
    const persons = loadPersonsFromFile("persons.txt"); // path to your .txt file
    console.log(JSON.stringify(sortedPersons(persons), null, 2));
} catch (err) {
    console.error(err.message);
}
