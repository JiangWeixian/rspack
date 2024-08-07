import {
	BuiltinPluginName,
	type RawSizeLimitsPluginOptions
} from "@rspack/binding";

import type { Performance } from "..";
import { create } from "./base";

export const SizeLimitsPlugin = create(
	BuiltinPluginName.SizeLimitsPlugin,
	(options: Exclude<Performance, false>): RawSizeLimitsPluginOptions => {
		const hints = options.hints === false ? undefined : options.hints;

		return { ...options, hints };
	}
);
