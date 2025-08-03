import * as core from '@actions/core';
import { ssmToFile } from './ssm-to-file.js';

async function run() {
  try {
    const region = process.env.AWS_DEFAULT_REGION;
    const ssmPath = core.getInput('ssm-path', { required: true });
    const format = core.getInput('format', { required: true });
    const output = core.getInput('output', { required: true });
    const prefix = core.getInput('prefix');
    const withDecryption = core.getInput('decryption') === 'true';

    try {
      await ssmToFile({
        region,
        ssmPath,
        format,
        output,
        prefix,
        withDecryption,
      });
    } catch (e) {
      core.error(e);
      core.setFailed(e.message);
    }
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
