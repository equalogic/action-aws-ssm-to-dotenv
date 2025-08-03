import { isValidFormat, formatter } from './format/index.js';
import { existsSync, appendFileSync, writeFileSync } from 'fs';
import { SSM } from './node_modules/@aws-sdk/client-ssm/dist-es/SSM.js';

async function ssmToFile({ region, ssmPath, format, output, prefix, withDecryption, }) {
    if (!isValidFormat(format)) {
        throw new Error(`invalid format: ${format}`);
    }
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
    const envs = allParameters
        .map(p => ({
        Value: p.Value,
        Name: p.Name.split('/').pop(),
    }))
        .map(formatter(format)(prefix));
    if (envs.length > 0) {
        envs.push('\n');
    }
    if (existsSync(output)) {
        console.log(`append to ${output} file`);
        appendFileSync(output, '\n' + envs.join('\n'));
    }
    else {
        console.log(`create ${output} file`);
        writeFileSync(output, envs.join('\n'));
    }
}

export { ssmToFile };
//# sourceMappingURL=ssm-to-file.js.map
