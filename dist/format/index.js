import { formatShell } from './shell.js';
import { formatDotenv } from './dotenv.js';
import { formatYaml } from './yaml.js';

function isValidFormat(type) {
    return ['dotenv', 'shell', 'yaml'].includes(type);
}
function formatter(type) {
    switch (type) {
        case 'shell':
            return formatShell;
        case 'dotenv':
            return formatDotenv;
        case 'yaml':
            return formatYaml;
        default:
            throw new Error(`invalid format: ${type}`);
    }
}

export { formatter, isValidFormat };
//# sourceMappingURL=index.js.map
