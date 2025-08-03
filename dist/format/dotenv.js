import { escapeForShell } from './shell.js';

const formatDotenv = (prefix = '') => ({ Name, Value }) => `${prefix}${Name}=${escapeForShell(Value)}`;

export { formatDotenv };
//# sourceMappingURL=dotenv.js.map
