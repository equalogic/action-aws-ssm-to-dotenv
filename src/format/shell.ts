import { FormatterFactory } from './index.js';

export const formatShell: FormatterFactory =
  (prefix = '') =>
  ({ Name, Value }) =>
    `export ${prefix}${Name}='${Value}'`;
