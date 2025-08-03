const formatShell = (prefix = '') => ({ Name, Value }) => `export ${prefix}${Name}=${escapeForShell(Value)}`;
/**
 * Escapes a string to be safely used as a shell variable value.
 * - Escapes single quotes, double quotes, backslashes
 * - Converts newlines to \n, tabs to \t, etc.
 * - Wraps in single quotes (preferred for POSIX shells)
 */
function escapeForShell(value) {
    return ('"' +
        value
            .replace(/\\/g, '\\\\') // Escape backslashes
            .replace(/"/g, '\\"') // Escape double quotes
            .replace(/\n/g, '\\n') // Newlines
            .replace(/\r/g, '\\r') // Carriage returns
            .replace(/\t/g, '\\t') + // Tabs
        '"');
}

export { escapeForShell, formatShell };
//# sourceMappingURL=shell.js.map
