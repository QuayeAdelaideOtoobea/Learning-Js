// 1️⃣ Import required modules
// These are built-in Node.js modules.
const fs = require("fs").promises; // for reading files asynchronously
const path = require("path");      // for working with file paths
const readline = require("readline"); // for interacting with the user in the console

// -------------------------------------------------------
// 2️⃣ Function to ask user for the file path
function askFilePath() {
    // readline creates a simple interface for input/output
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // return a Promise because reading input is async
    return new Promise(resolve => {
        rl.question("Enter the path to your .txt file: ", answer => {
            rl.close(); // close the interface when done
            resolve(answer.trim()); // remove extra spaces and return the path
        });
    });
}

// -------------------------------------------------------
// 3️⃣ Function to load data from the .txt file
async function loadPersonsFromFile(filePath) {
    // Check if the file has a .txt extension
    if (path.extname(filePath) !== ".txt") {
        throw new Error("Only .txt files are allowed!");
    }

    // Read the entire file as a string
    const fileData = await fs.readFile(filePath, "utf8");

    // Split the file into lines, trim whitespace, and remove empty lines
    const lines = fileData
        .split(/\r?\n/) // works for Windows (\r\n) and Linux/Mac (\n)
        .map(line => line.trim())
        .filter(line => line.length > 0);

    // Debug: see what we got
    console.log("Lines read from file:", lines);

    return lines;
}

// -------------------------------------------------------
// 4️⃣ Function to sort the persons by date of birth
function sortedPersons(persons) {
    const sorted = {}; // final nested object

    persons.forEach(element => {
        // Each line is expected to be: FirstName_LastName_DD/MM/YYYY
        const [firstName, lastName, dateOfBirth] = element.split("_");
        const [dd, mm, yyyy] = dateOfBirth.split("/"); // split date into day, month, year

        const fullName = `${firstName} ${lastName}`; // combine first and last name

        // Build nested structure: year -> month -> day -> array of names
        if (!sorted[yyyy]) sorted[yyyy] = {};
        if (!sorted[yyyy][mm]) sorted[yyyy][mm] = {};
        if (!sorted[yyyy][mm][dd]) sorted[yyyy][mm][dd] = [];

        sorted[yyyy][mm][dd].push(fullName);
    });

    // Debug: see the sorted object
    console.log("Sorted object:", JSON.stringify(sorted, null, 2));

    return sorted;
}

// -------------------------------------------------------
// 5️⃣ Main function to run everything
async function main() {
    try {
        const filePath = await askFilePath(); // Step 1: ask user
        const persons = await loadPersonsFromFile(filePath); // Step 2: read file
        const result = sortedPersons(persons); // Step 3: sort data
        console.log("Final Result:", JSON.stringify(result, null, 2));
    } catch (err) {
        console.error("Error:", err.message);
    }
}

// Start the program
main();
