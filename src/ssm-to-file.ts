import * as AWS from 'aws-sdk';
import { formatter, isValidFormat } from './format/index.js';
import { appendFileSync, existsSync, writeFileSync } from 'fs';
import { GetParametersByPathResult, Parameter } from 'aws-sdk/clients/ssm.js';

export interface SsmToFileArgs {
  region: string;
  ssmPath: string;
  format: string;
  output: string;
  prefix?: string;
  withDecryption?: boolean;
}

export async function ssmToFile({
  region,
  ssmPath,
  format,
  output,
  prefix,
  withDecryption,
}: SsmToFileArgs): Promise<void> {
  if (!isValidFormat(format)) {
    throw new Error(`invalid format: ${format}`);
  }

  const ssm = new AWS.SSM({ region });

  const allParameters: Parameter[] = [];
  let nextToken: string | undefined = undefined;

  do {
    const result: GetParametersByPathResult = await ssm
      .getParametersByPath({
        WithDecryption: withDecryption,
        Path: ssmPath,
        Recursive: true,
        NextToken: nextToken,
      })
      .promise();

    nextToken = result.NextToken;
    allParameters.push(...result.Parameters);
  } while (nextToken);

  const envs = allParameters
    .map<Parameter>(p => ({
      Value: p.Value,
      Name: p.Name.split('/').pop(),
    }))
    .map<string>(formatter(format)(prefix));

  if (envs.length > 0) {
    envs.push('\n');
  }

  if (existsSync(output)) {
    console.log(`append to ${output} file`);
    appendFileSync(output, '\n' + envs.join('\n'));
  } else {
    console.log(`create ${output} file`);
    writeFileSync(output, envs.join('\n'));
  }
}
