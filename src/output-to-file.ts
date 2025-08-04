import { Parameter } from '@aws-sdk/client-ssm';
import { formatter, isValidFormat } from './format/index.js';
import { appendFileSync, existsSync, writeFileSync } from 'fs';

export interface OutputToFileOptions {
  format: string;
  prefix?: string;
}

export async function outputToFile(
  parameters: Parameter[],
  filename: string,
  { format, prefix }: OutputToFileOptions,
): Promise<void> {
  if (!isValidFormat(format)) {
    throw new Error(`invalid format: ${format}`);
  }

  const envs = parameters
    .map<Parameter>(p => ({
      Value: p.Value,
      Name: p.Name.split('/').pop(),
    }))
    .map<string>(formatter(format)(prefix));

  if (envs.length > 0) {
    envs.push('\n');
  }

  if (existsSync(filename)) {
    console.log(`append to ${filename} file`);
    appendFileSync(filename, '\n' + envs.join('\n'));
  } else {
    console.log(`create ${filename} file`);
    writeFileSync(filename, envs.join('\n'));
  }
}
