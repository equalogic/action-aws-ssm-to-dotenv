import { FormatterFactory } from './index.js';

export const formatDotenv: FormatterFactory =
  (prefix = '') =>
  ({ Name, Value }) =>
    `${prefix}${Name}='${Value}'`;
