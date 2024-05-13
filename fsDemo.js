// import fs from "fs"; // readFile and readFileSync()
import fs from "fs/promises";

// read file() - callback

// fs.readFile('./test.txt', 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })

// readFileSync() - Synchronous version

// const data = fs.readFileSync("./test.txt", "utf8");
// console.log(data);


// readFile() - Promise version

// fs.readFile("./test.txt", "utf8")
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// readFile() - Async/Await version

 const readFile = async () => {
     try {
         const data = await(fs.readFile("./test.txt", "utf8"));
         console.log(data);
     } catch (error) {
         console.log(error);
     }
 }


// writeFile()

const writeFile = async () => {
    try {
        await fs.writeFile("./test.txt", "I am so happy to learn Node.js");
        console.log("File created");
    } catch (error) {
        console.log(error);
    }
}

// appendFile()

const appendFile = async () => {
    try {
        await fs.appendFile('./test.txt', '\nIt is very exciting journey');
        console.log("File appended");
    } catch (error) {
        console.log(error);
    }
}
const writeFileAndAppend = async () => {
    try {
        await writeFile();
        await appendFile();
        await readFile();
    } catch (error) {
        console.log(error);
    }
}

writeFileAndAppend();
