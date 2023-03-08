const http = require('http');
const url = require('url');




const User = require('./')


const server = http.createServer((req , res ) =>{
    console.log(req.url);
    res.end('hello from the server');

});

const port = 8081;


server.listen(port, '127.0.0.1',()=>{
    console.log(`server listening from ${port}...`);

});


