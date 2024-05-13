import url from "url";

const urlString = "https://www.google.com/search?q=nodejs";

// URL Object
const urlObj = new URL(urlString);
// console.log(urlObj);

// format()
// console.log(url.format(urlObj));

// import.meta.url it gives file path with file
//  console.log(import.meta.url);

// fileURLToPath() 
// console.log(url.fileURLToPath(import.meta.url));

const params = new URLSearchParams(urlObj.search);
console.log(params.get('q'));
params.append('limit', 10);
params.delete('limit');
console.log(params);
