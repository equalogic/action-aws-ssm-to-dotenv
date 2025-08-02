import {formatShell} from './shell.js'
import {formatDotenv} from './dotenv.js'
import {formatYaml} from './yaml.js'

export function formatter(type: 'shell' | 'dotenv' | 'yaml' | string) {
  if (type === 'shell') {
    return formatShell
  }
  if (type === 'dotenv') {
    return formatDotenv
  }
  if (type === 'yaml') {
    return formatYaml
  }
  return _ => _
}
