import NpmPackage from './NpmPackage.js';
import { getLatestVersion, getNpmInfo, getNpmRegistry, getVersions } from './versionUtils.js';
import path from 'node:path';

async function main() {
    // const version = await getLatestVersion('create-vite');

    // console.log(version);

    // const versions = await getVersions('create-vite');

    // console.log(versions);

    const pkg = new NpmPackage({
        targetPath: path.join(import.meta.dirname, '../aaa'),
        name: '@babel/core'
    });

    if(await pkg.exists()) {
        pkg.update();
    } else {
        pkg.install();
    }

    console.log(await pkg.getPackageJSON())
}

main();
