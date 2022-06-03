import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { copyFiles } from './createmvc';

const access = promisify(fs.access);

export async function createSeed(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const seedDir = path.resolve(
        fileURLToPath(import.meta.url),
        '../../seeddata',
        options.database.toLowerCase(),
    );

    options.templateDirectory = seedDir;

    try {
        await access(seedDir, fs.constants.R_OK);
    } catch (error) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    console.log('Create seeddata file');
    await copyFiles(options);

    console.log ("Seedata ready", chalk.green.bold('DONE'));
    return true;
}