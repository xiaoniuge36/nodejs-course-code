import {
    createReadStream,
    createWriteStream,
} from 'node:fs';
import { pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';
  
const gzip = createGzip();
const source = createReadStream(import.meta.dirname + '/data.txt');
const destination = createWriteStream('data.txt.gz');

// source.pipe(gzip).pipe(destination);
pipeline(source, gzip, destination)
