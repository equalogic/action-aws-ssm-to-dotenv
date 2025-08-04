import * as core from '@actions/core';
import { outputToFile } from './output-to-file.js';
import { fetchParameters } from './fetch-parameters.js';

async function run() {
  try {
    const region = process.env.AWS_DEFAULT_REGION;
    const ssmPath = core.getInput('ssm-path', { required: true });
    const format = core.getInput('format') || 'github-actions';
    const output = core.getInput('output') || '.env';
    const prefix = core.getInput('prefix');
    const withDecryption = core.getInput('decryption') === 'true';

    try {
      const parameters = await fetchParameters(ssmPath, {
        region,
        withDecryption,
      });

      if (format === 'github-actions') {
        parameters.forEach(p => {
          core.exportVariable(p.Name, p.Value);
        });
      } else {
        await outputToFile(parameters, output, {
          format,
          prefix,
        });
      }
    } catch (e) {
      core.error(e);
      core.setFailed(e.message);
    }
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
