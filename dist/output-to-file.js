import { isValidFormat, formatter } from './format/index.js';
import { existsSync, appendFileSync, writeFileSync } from 'fs';

async function outputToFile(parameters, filename, { format, prefix }) {
    if (!isValidFormat(format)) {
        throw new Error(`invalid format: ${format}`);
    }
    const envs = parameters
        .map(p => ({
        Value: p.Value,
        Name: p.Name.split('/').pop(),
    }))
        .map(formatter(format)(prefix));
    if (envs.length > 0) {
        envs.push('\n');
    }
    if (existsSync(filename)) {
        console.log(`append to ${filename} file`);
        appendFileSync(filename, '\n' + envs.join('\n'));
    }
    else {
        console.log(`create ${filename} file`);
        writeFileSync(filename, envs.join('\n'));
    }
}

export { outputToFile };
//# sourceMappingURL=output-to-file.js.map
