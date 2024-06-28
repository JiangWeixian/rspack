import type { SocketUrlParts } from "./getSocketUrlParts";
import type { WDSMetaObj } from "./getWDSMetadata";
/**
 * Create a valid URL from parsed URL parts.
 * @param {import('./getSocketUrlParts').SocketUrlParts} urlParts The parsed URL parts.
 * @param {import('./getWDSMetadata').WDSMetaObj} [metadata] The parsed WDS metadata object.
 * @returns {string} The generated URL.
 */
export default function urlFromParts(urlParts: SocketUrlParts, metadata: WDSMetaObj): string;
