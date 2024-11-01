const { glob } = require('glob');

async function main() {
    const files = await glob('**', {
        cwd: process.cwd(),
        nodir: true,
        ignore: 'node_modules/**'
    })
    console.log(files);
}

main();