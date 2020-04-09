// code away!

//set up server object

const server = require('./server.js');

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`===Server is listening on http://localhost:${5000}===`);
})