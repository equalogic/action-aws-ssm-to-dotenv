import { c as coreExports } from './_virtual/core.js';
import { outputToFile } from './output-to-file.js';
import { fetchParameters } from './fetch-parameters.js';

async function run() {
    try {
        const region = process.env.AWS_DEFAULT_REGION;
        const ssmPath = coreExports.getInput('ssm-path', { required: true });
        const format = coreExports.getInput('format', { required: true });
        const output = coreExports.getInput('output', { required: true });
        const prefix = coreExports.getInput('prefix');
        const withDecryption = coreExports.getInput('decryption') === 'true';
        try {
            const parameters = await fetchParameters(ssmPath, {
                region,
                withDecryption,
            });
            if (format === 'github-actions') {
                parameters.forEach(p => {
                    coreExports.exportVariable(p.Name, p.Value);
                });
            }
            else {
                await outputToFile(parameters, output, {
                    format,
                    prefix,
                });
            }
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
