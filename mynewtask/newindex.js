const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");


function askFilePath() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question("Enter the path to your .txt file: ", answer => {
            rl.close();
            resolve(answer.trim());
        }
    );
    }
    

    if (filePath!== persons.txt) {
        throw new Error("This file does not exist!");
    }
);
}

async  function loadPersonsFromFile(filePath) {
    if (path.extname(filePath) !== ".txt") {
        throw new Error("Only .txt files are allowed!");
    }

    const fileData = await fs.readFile(filePath, "utf8");

    return fileData
        .split(/\r?\n/) 
        .map(line => line.trim())
        .filter(line => line.length > 0);
}

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