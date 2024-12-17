import { Readable } from 'node:stream';

class ReadableDong extends Readable {

    _read() {
        this.push('阿门阿前一棵葡萄树，');
        this.push('阿东阿东绿的刚发芽，');
        this.push('阿东背着那重重的的壳呀，');
        this.push('一步一步地往上爬。')
        this.push(null);
    }

}

const readableStream = new ReadableDong();

readableStream.on('data', (data)=> {
    console.log(data.toString())
});

readableStream.on('end', () => {
    console.log('done');
});