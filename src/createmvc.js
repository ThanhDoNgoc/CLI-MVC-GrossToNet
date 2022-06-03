import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const access = promisify(fs.access);
const copy = promisify(ncp);

export async function copyFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
      clobber: false,
    });
}

export async function createMVCProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const currentFileUrl = import.meta.url;
    console.log(currentFileUrl);

    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '../../mvcmodel',
        'mvc',
    );

    options.templateDirectory = templateDir;

    console.log(templateDir);

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (error) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    console.log('Cloning MVC files');
    await copyFiles(options);
    return true;
}