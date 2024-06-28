"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
/**
 * The following code is modified based on
 * https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/f1c8b9a44198449093ca95f85af5df97925e1cfc/sockets/WPSSocket.js
 *
 * MIT Licensed
 * Author Michael Mok
 * Copyright (c) 2019 Michael Mok
 * https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/0b960573797bf38926937994c481e4fec9ed8aa6/LICENSE
 */
const getSocketUrlParts_1 = __importDefault(require("./utils/getSocketUrlParts"));
const getUrlFromParts_1 = __importDefault(require("./utils/getUrlFromParts"));
const getWDSMetadata_1 = __importDefault(require("./utils/getWDSMetadata"));
/**
 * Initializes a socket server for HMR for webpack-dev-server.
 * @param {function(*): void} messageHandler A handler to consume Webpack compilation messages.
 * @param {string} [resourceQuery] Webpack's `__resourceQuery` string.
 * @returns {void}
 */
function init(messageHandler, resourceQuery) {
    if (typeof __webpack_dev_server_client__ !== "undefined") {
        let SocketClient = __webpack_dev_server_client__;
        if (typeof __webpack_dev_server_client__.default !== "undefined") {
            SocketClient = __webpack_dev_server_client__.default;
        }
        const wdsMeta = (0, getWDSMetadata_1.default)(SocketClient);
        const urlParts = (0, getSocketUrlParts_1.default)(resourceQuery, wdsMeta);
        const connection = new SocketClient((0, getUrlFromParts_1.default)(urlParts, wdsMeta));
        // @ts-expect-error -- ignore
        connection.onMessage(function onSocketMessage(data) {
            const message = JSON.parse(data);
            messageHandler(message);
        });
    }
}
exports.init = init;
