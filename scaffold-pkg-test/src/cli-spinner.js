const Spinner = require('cli-spinner').Spinner

console.log('111');
console.log('222');

const spinner = new Spinner(`安装中.. %s`)
spinner.start()

setTimeout(() => {
    spinner.stop(true);
}, 3000);
