import parseArgs from './_virtual/index.js';
import { outputToFile } from './output-to-file.js';
import { fetchParameters } from './fetch-parameters.js';

const USAGE_HELP = 'Usage: ssm-to-file --path <ssm-path> [--region <region>] [--prefix <prefix>] [--format (dotenv|shell|yaml)] [--decrypt] [filename]';
const cliArgs = parseArgs(process.argv.slice(2), {
    string: ['path', 'region', 'prefix', 'format'],
    boolean: ['decrypt'],
    default: {
        region: process.env.AWS_DEFAULT_REGION,
        format: 'dotenv',
    },
});
if (!cliArgs.path) {
    console.error('path is required');
    console.log(USAGE_HELP);
    process.exit(1);
}
if (!cliArgs.region) {
    console.error('region is required');
    console.log(USAGE_HELP);
    process.exit(1);
}
const parameters = await fetchParameters(cliArgs.path, {
    region: cliArgs.region,
    withDecryption: cliArgs.decrypt,
});
await outputToFile(parameters, cliArgs._[0] ?? '.env', {
    format: cliArgs.format,
    prefix: cliArgs.prefix,
});
//# sourceMappingURL=cli.js.map
