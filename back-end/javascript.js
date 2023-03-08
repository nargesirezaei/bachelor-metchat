const fs = require('fs');



const input = fs.readFile('input.txt' , 'utf-8', (err, data ) => {
    console.log(data);
});
console.log('reading file ...');

