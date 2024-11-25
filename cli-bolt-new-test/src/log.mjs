import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { spawn } from 'child_process';

async function main() {
    const screen = blessed.screen({
        fullUnicode: true
    });

    const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

    const box = grid.set(4, 3, 6, 9, blessed.box, {
        label: '构建日志', 
        mouse: true,
        scrollable: true
    });

    const server = spawn('npx', ['http-server', '.'], {
        env: { ...process.env, FORCE_COLOR: true },
    });

    let content = ''
    server.stdout.on('data', (data) => {
        content += data.toString();
        box.content = content;
        screen.render();
    });

    screen.key('C-c', function() {
        screen.destroy();
    });

    screen.render();


}

main();
