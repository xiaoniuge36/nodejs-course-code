import { SourceMapConsumer } from 'source-map';
import fs from 'node:fs';

const mapContent = fs.readFileSync('./dist/index.js.map', 'utf-8');

const map = new SourceMapConsumer(mapContent);

const position = map.originalPositionFor({
    line: 54,
    column: 0
});

console.log(position);