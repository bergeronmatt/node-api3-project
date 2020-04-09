// code away!

//set up server object

const server = require('./server.js');

server.listen(5000, () => {
    console.log('===Server is listening on http://localhost:5000===');
})