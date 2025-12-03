//output printing to a json file instead of console

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
        await fs.writeFile("sorted_output.json", JSON.stringify(result, null, 2), "utf8");

        console.log("Done! Output written to sorted_output.json");
    } catch (err) {
        console.error("Error:", err.message);
    }
}

main();

/*async function main() {
    try {
        const filePath = await askFilePath();
        const persons = await loadPersonsFromFile(filePath);
        const result = sortedPersons(persons);

        await fs.writeFile("sorted_output.json", JSON.stringify(result, null, 2), "utf8");

        console.log("Done! Output written to sorted_output.json");
    }
main();*/



