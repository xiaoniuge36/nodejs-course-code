const ora = require('ora');

console.log(111);
console.log(222);

const spinner = ora('下载中...').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = '快了快了...';
}, 2000);

setTimeout(() => {
    spinner.stop();
}, 5000);