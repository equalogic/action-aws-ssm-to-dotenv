import { FormatterFactory } from './index.js';

export const formatYaml: FormatterFactory =
  (prefix = '') =>
  ({ Name, Value }) =>
    `${prefix}${Name}: ${Value}`;
