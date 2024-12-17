import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer(async function (req, res) {
    // const data = fs.readFileSync(import.meta.dirname + '/data.txt', 'utf-8');
    // res.end(data);
    const readStream = fs.createReadStream(import.meta.dirname + '/data.txt', 'utf-8');
    readStream.pipe(res);
});

server.listen(8000);
