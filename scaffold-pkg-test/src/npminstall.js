const npminstall = require('npminstall');

(async () => {
  await npminstall({
    pkgs: [
        { name: 'chalk', version: 'latest' },
    ],
    root: process.cwd() + '/aaa',
    registry: 'https://registry.npmjs.org',
  });
})().catch(err => {
  console.error(err);
});
