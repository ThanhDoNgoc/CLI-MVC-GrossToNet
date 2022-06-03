import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { copyFiles } from './createmvc';

const access = promisify(fs.access);
const copy = promisify(ncp);


export async function createDatabase(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const currentFileUrl = import.meta.url;
    console.log(currentFileUrl);

    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '../../database',
        options.database.toLowerCase(),
    );

    options.templateDirectory = templateDir;

    console.log(templateDir);

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (error) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    console.log('Cloning project files');
    await copyFiles(options);

    console.log ("", chalk.green.bold('DONE'));
    return true;
}