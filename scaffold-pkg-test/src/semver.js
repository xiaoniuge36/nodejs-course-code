const semver = require('semver');

if(semver.valid('1.2.3#')) {
    console.log('版本号有效');
} else {
    console.log('版本号无效');
}

if(semver.gt('2.0.0', '1.0.8')) {
    console.log('有新版本可以安装')
}

if(semver.lte(process.version, '22.0.0')) {
    console.log(`node 版本 ${process.version} 小于 22`)
}
