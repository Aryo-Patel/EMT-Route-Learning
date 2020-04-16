let express = require('express');
let http = require('http');

let app = express();
let workingDirectory = `${__dirname}/../client`;
app.use(express.static(workingDirectory));

let server = http.createServer(app);
server.listen(8888, () =>{
    console.log('listening on 8888');
}
)