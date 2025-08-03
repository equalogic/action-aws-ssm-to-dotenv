import { formatShell } from './shell.js';
import { formatDotenv } from './dotenv.js';
import { formatYaml } from './yaml.js';

export type Format = 'dotenv' | 'shell' | 'yaml';

export type Formatter = (p: { Name: string; Value: string }) => string;

export type FormatterFactory = (prefix?: string) => Formatter;

export function isValidFormat(type: string): type is Format {
  return ['dotenv', 'shell', 'yaml'].includes(type);
}

export function formatter(type: Format): FormatterFactory {
  switch (type) {
    case 'shell':
      return formatShell;
    case 'dotenv':
      return formatDotenv;
    case 'yaml':
      return formatYaml;
    default:
      throw new Error(`invalid format: ${type}`);
  }
}
