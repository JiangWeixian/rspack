"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const d = (object, property, defaultValue) => {
    // TODO: should we also add default for null?
    if (typeof object[property] === "undefined" &&
        typeof defaultValue !== "undefined") {
        object[property] = defaultValue;
    }
    return object[property];
};
const normalizeOverlay = (options) => {
    const defaultOverlay = {
        entry: require.resolve('../client/errorOverlayEntry.js'),
        module: require.resolve('../client/overlay/index.js'),
        sockIntegration: "wds"
    };
    if (!options) {
        return false;
    }
    if (typeof options === "undefined" || options === true) {
        return defaultOverlay;
    }
    options.entry = options.entry ?? defaultOverlay.entry;
    options.module = options.module ?? defaultOverlay.module;
    options.sockIntegration =
        options.sockIntegration ?? defaultOverlay.sockIntegration;
    return options;
};
function normalizeOptions(options) {
    d(options, "exclude", /node_modules/i);
    d(options, "include", /\.([cm]js|[jt]sx?|flow)$/i);
    d(options, "library");
    d(options, "forceEnable", false);
    options.overlay = normalizeOverlay(options.overlay);
    return options;
}
exports.normalizeOptions = normalizeOptions;
