import arg from 'arg';
import inquirer from 'inquirer';
import { createMVCProject} from './createmvc';
import { createDatabase} from './createdatabase';
import { createSeed } from './createseed';

function parseArgumentsIntoOptions(rawArg){
    const args = arg(
        {
            '--seedData': Boolean,
        },
        {
            argv: rawArg.slice(2),
        }
    );
    return {
        database: args._[0],
        seeddata: args['--seedData'] || false,  
    }
}

async function promptForMissingOptions(options) {
    const defaultDatabase = 'MySQL';
    
    const questions = [];
    if (!options.database) {
        questions.push({
            type: 'list',
            name: 'database',
            message: 'Choose template to install',
            choices: ['MySQL', 'Mongodb'],
            default: defaultDatabase,
        })
    }
    if (!options.seeddata) {
        questions.push({
            type: 'list',
            name: 'seeddata',
            message: 'Create Seed data file',
            choices: ['True', 'False'],
            default: false,
        })
    }
    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        database: options.database || answers.database,
        seeddata: options.seeddata || answers.seeddata,
      };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createMVCProject(options);
    await createDatabase(options);
    if (options.seeddata) {
        await createSeed(options);
    }
    //console.log(options);
}