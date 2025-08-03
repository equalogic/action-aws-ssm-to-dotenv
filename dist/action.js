import { c as coreExports } from './_virtual/core.js';
import { ssmToFile } from './ssm-to-file.js';

async function run() {
    try {
        const region = process.env.AWS_DEFAULT_REGION;
        const ssmPath = coreExports.getInput('ssm-path', { required: true });
        const format = coreExports.getInput('format', { required: true });
        const output = coreExports.getInput('output', { required: true });
        const prefix = coreExports.getInput('prefix');
        const withDecryption = coreExports.getInput('decryption') === 'true';
        try {
            await ssmToFile({
                region,
                ssmPath,
                format,
                output,
                prefix,
                withDecryption,
            });
        }
        catch (e) {
            coreExports.error(e);
            coreExports.setFailed(e.message);
        }
    }
    catch (e) {
        coreExports.setFailed(e.message);
    }
}
run();
//# sourceMappingURL=action.js.map
