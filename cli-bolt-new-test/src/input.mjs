import blessed from 'blessed';
import contrib from 'blessed-contrib';

async function main() {
    const screen = blessed.screen({
        fullUnicode: true
    });

    const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });
    
    const textarea = grid.set(8, 2, 4, 8, blessed.textarea, {
        label: '描述下你想生成什么样的网站', 
        fg: 'green',
        mouse: true
    });

    textarea.readInput((err, value) => {
        screen.destroy();
        console.log(textarea.value);
    } );

    screen.key('C-c', function() {
        screen.destroy();
    });
    
    screen.render();
}

main();
