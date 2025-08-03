import { FormatterFactory } from './index.js';
import { escapeForShell } from './shell.js';

export const formatDotenv: FormatterFactory =
  (prefix = '') =>
  ({ Name, Value }) =>
    `${prefix}${Name}=${escapeForShell(Value)}`;
