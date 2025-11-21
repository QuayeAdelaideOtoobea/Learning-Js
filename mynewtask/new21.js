const fs = require('fs');

// -------- SIMPLE SORT FUNCTION --------
function sortedPersons(persons) {
    const sorted = {};

    for (const entry of persons) {
        const [first, last, dob] = entry.split('_');
        const [dd, mm, yyyy] = dob.split('/');

        sorted[yyyy] ??= {};
        sorted[yyyy][mm] ??= {};
        sorted[yyyy][mm][dd] ??= [];

        sorted[yyyy][mm][dd].push(`${first} ${last}`);
    }

    return sorted;
}

// -------- READ FILE FROM ARGUMENT --------
const filePath = process.argv[2];

if (!filePath) {
    console.error("Please provide a .txt file path.\nExample: node app.js people.txt");
    process.exit(1);
}

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const persons = data.split('\n').filter(Boolean); // remove empty lines

    const result = sortedPersons(persons);
    console.log(JSON.stringify(result, null, 2));

} catch (err) {
    console.error("Error reading file:", err.message);
}
















// const fs=require("fs"),f=process.argv[2];if(!f)throw"no file";console.log(JSON.stringify(fs.readFileSync(f,"utf8").trim().split("\n").reduce((r,s)=>{let[a,b,c]=s.split("_"),[d,m,y]=c.split("/");(((r[y]??={}))[m]??={})[d]??=[];r[y][m][d].push(a+" "+b);return r;},{}),null,2));

