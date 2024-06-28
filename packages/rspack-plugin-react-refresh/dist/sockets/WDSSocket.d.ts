declare global {
    var __webpack_dev_server_client__: any;
}
/**
 * Initializes a socket server for HMR for webpack-dev-server.
 * @param {function(*): void} messageHandler A handler to consume Webpack compilation messages.
 * @param {string} [resourceQuery] Webpack's `__resourceQuery` string.
 * @returns {void}
 */
export declare function init(messageHandler: (...args: any[]) => void, resourceQuery: string): void;
