"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSocketIntegration(integrationType) {
    let resolvedSocketIntegration;
    switch (integrationType) {
        case "wds": {
            resolvedSocketIntegration = require.resolve("../sockets/WDSSocket");
            break;
        }
        default: {
            resolvedSocketIntegration = require.resolve(integrationType);
            break;
        }
    }
    return resolvedSocketIntegration;
}
exports.default = getSocketIntegration;
