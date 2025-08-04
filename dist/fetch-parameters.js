import { SSM } from './node_modules/@aws-sdk/client-ssm/dist-es/SSM.js';

async function fetchParameters(ssmPath, { region, withDecryption } = {}) {
    const ssm = new SSM({ region });
    const allParameters = [];
    let nextToken = undefined;
    do {
        const result = await ssm.getParametersByPath({
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

export { fetchParameters };
//# sourceMappingURL=fetch-parameters.js.map
