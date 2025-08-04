import { GetParametersByPathResult, Parameter, SSM } from '@aws-sdk/client-ssm';

export interface FetchParametersOptions {
  region?: string;
  withDecryption?: boolean;
}

export async function fetchParameters(
  ssmPath: string,
  { region, withDecryption }: FetchParametersOptions = {},
): Promise<Parameter[]> {
  const ssm = new SSM({ region });

  const allParameters: Parameter[] = [];
  let nextToken: string | undefined = undefined;

  do {
    const result: GetParametersByPathResult = await ssm.getParametersByPath({
      WithDecryption: withDecryption,
      Path: ssmPath,
      Recursive: true,
      NextToken: nextToken,
    });

    nextToken = result.NextToken;
    allParameters.push(...result.Parameters);
  } while (nextToken);

  return allParameters;
}
