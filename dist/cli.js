import parseArgs from './_virtual/index.js';
import { ssmToFile } from './ssm-to-file.js';

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
await ssmToFile({
    ssmPath: cliArgs.path,
    region: cliArgs.region,
    prefix: cliArgs.prefix,
    format: cliArgs.format,
    withDecryption: cliArgs.decrypt,
    output: cliArgs._[0] ?? '.env',
});
//# sourceMappingURL=cli.js.map
