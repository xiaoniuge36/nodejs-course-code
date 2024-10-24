const minimist = require('minimist');

const argv = minimist(process.argv.slice(2), {
    boolean: ['x'],
    string: ['y'],
    unknown(arg) {
        return arg === '-u'
    },
    default: { y: 2333 },
    alias: { p: 'port', t: 'template' }
});
console.log(argv);
