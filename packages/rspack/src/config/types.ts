import type { JsAssetInfo, RawFuncUseCtx } from "@rspack/binding";
import type { PathData } from "../Compilation";
import type { Compiler } from "../Compiler";
import type { Module } from "../Module";
import type { Chunk } from "../exports";

export type FilenameTemplate = string;

export type Filename =
	| FilenameTemplate
	| ((pathData: PathData, assetInfo?: JsAssetInfo) => string);

//#region Name
/** Name of the configuration. Used when loading multiple configurations. */
export type Name = string;
//#endregion

//#region Dependencies
/** A list of name defining all sibling configurations it depends on. Dependent configurations need to be compiled first. */
export type Dependencies = Name[];
//#endregion

//#region Context
/**
 * The context configuration is used to set the base directory for Rspack builds.
 * @default process.cwd()
 * */
export type Context = string;
//#endregion

//#region Mode
/**
 * The mode configuration is used to set the build mode of Rspack to enable the default optimization strategy.
 * @default 'production'
 * */
export type Mode = "development" | "production" | "none";
//#endregion

//#region Falsy
export type Falsy = false | "" | 0 | null | undefined;
//#endregion

//#region Entry
/** The publicPath of the resource referenced by this entry. */
export type PublicPath = "auto" | Filename;

/** The baseURI of the resource referenced by this entry. */
export type BaseUri = string;

/** How this entry load other chunks. */
export type ChunkLoadingType =
	| string
	| "jsonp"
	| "import-scripts"
	| "require"
	| "async-node"
	| "import";

/** How this entry load other chunks. */
export type ChunkLoading = false | ChunkLoadingType;

/** Whether to create a load-on-demand asynchronous chunk for entry. */
export type AsyncChunks = boolean;

/** Option to set the method of loading WebAssembly Modules. */
export type WasmLoadingType =
	| string
	| "fetch-streaming"
	| "fetch"
	| "async-node";

/** Option to set the method of loading WebAssembly Modules. */
export type WasmLoading = false | WasmLoadingType;

export type ScriptType = false | "text/javascript" | "module";

export type LibraryCustomUmdObject = {
	amd?: string;
	commonjs?: string;
	root?: string | string[];
};

/** Specify a name for the library. */
export type LibraryName = string | string[] | LibraryCustomUmdObject;

export type LibraryCustomUmdCommentObject = {
	amd?: string;
	commonjs?: string;
	commonjs2?: string;
	root?: string;
};

/** Use a container(defined in global space) for calling define/require functions in an AMD module. */
export type AmdContainer = string;

/** Add a comment in the UMD wrapper. */
export type AuxiliaryComment = string | LibraryCustomUmdCommentObject;

/** Specify which export should be exposed as a library. */
export type LibraryExport = string | string[];

/** Configure how the library will be exposed. */
export type LibraryType =
	| string
	| "var"
	| "module"
	| "assign"
	| "assign-properties"
	| "this"
	| "window"
	| "self"
	| "global"
	| "commonjs"
	| "commonjs2"
	| "commonjs-module"
	| "commonjs-static"
	| "amd"
	| "amd-require"
	| "umd"
	| "umd2"
	| "jsonp"
	| "system";

/** When using output.library.type: "umd", setting output.library.umdNamedDefine to true will name the AMD module of the UMD build. */
export type UmdNamedDefine = boolean;

/** Options for library.  */
export type LibraryOptions = {
	/** Use a container(defined in global space) for calling define/require functions in an AMD module. */
	amdContainer?: AmdContainer;

	/** Add a comment in the UMD wrapper. */
	auxiliaryComment?: AuxiliaryComment;

	/** Specify which export should be exposed as a library. */
	export?: LibraryExport;

	/** Specify a name for the library. */
	name?: LibraryName;

	/** Configure how the library will be exposed. */
	type: LibraryType;

	/**
	 * When using output.library.type: "umd", setting output.library.umdNamedDefine to true will name the AMD module of the UMD build.
	 * Otherwise, an anonymous define is used.
	 * */
	umdNamedDefine?: UmdNamedDefine;
};

/** Options for library. */
export type Library = LibraryName | LibraryOptions | undefined;

/** The layer of this entry. */
export type Layer = string | null;

/** The filename of the entry chunk. */
export type EntryFilename = Filename;

/** The name of the runtime chunk. */
export type EntryRuntime = false | string;

/** The path to the entry module. */
export type EntryItem = string | string[];

/** The entry that the current entry depends on. With dependOn option you can share the modules from one entry chunk to another. */
export type EntryDependOn = string | string[];

export type EntryDescription = {
	/**
	 * The path to the entry module.
	 * @default './src/index.js'
	 * */
	import: EntryItem;

	/**
	 * The name of the runtime chunk.
	 * When runtime is set, a new runtime chunk will be created.
	 * You can also set it to false to avoid a new runtime chunk.
	 * */
	runtime?: EntryRuntime;

	/** The publicPath of the resource referenced by this entry. */
	publicPath?: PublicPath;

	/** The baseURI of the resource referenced by this entry. */
	baseUri?: BaseUri;

	/** How this entry load other chunks. */
	chunkLoading?: ChunkLoading;

	/** Whether to create a load-on-demand asynchronous chunk for this entry. */
	asyncChunks?: AsyncChunks;

	/** Option to set the method of loading WebAssembly Modules. */
	wasmLoading?: WasmLoading;

	/** The filename of the entry chunk. */
	filename?: EntryFilename;

	/** The format of the chunk generated by this entry as a library. */
	library?: LibraryOptions;

	/** The entry that the current entry depends on. With dependOn option you can share the modules from one entry chunk to another. */
	dependOn?: EntryDependOn;

	/** The layer of this entry, make the corresponding configuration take effect through layer matching in SplitChunks, Rules, Stats, and Externals. */
	layer?: Layer;
};

export type EntryUnnamed = EntryItem;

export type EntryObject = Record<string, EntryItem | EntryDescription>;

/** A static entry.  */
export type EntryStatic = EntryObject | EntryUnnamed;

/** A Function returning entry options. */
export type EntryDynamic = () => EntryStatic | Promise<EntryStatic>;

/** The entry options for building */
export type Entry = EntryStatic | EntryDynamic;
//#endregion

//#region Output
/** The output directory as an absolute path. */
export type Path = string;

/** Tells Rspack to include comments in bundles with information about the contained modules. */
export type Pathinfo = boolean | "verbose";

/** Before generating the products, delete all files in the output directory. */
export type AssetModuleFilename = Filename;

/** Specifies the filename of WebAssembly modules. */
export type WebassemblyModuleFilename = string;

/** This option determines the name of non-initial chunk files. */
export type ChunkFilename = Filename;

/** Allows you to set the [crossorigin attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)  */
export type CrossOriginLoading = false | "anonymous" | "use-credentials";

/** This option determines the name of CSS output files on disk. */
export type CssFilename = Filename;

/** This option determines the name of non-initial CSS output files on disk. */
export type CssChunkFilename = Filename;

/** Customize the filenames of hot update chunks. */
export type HotUpdateChunkFilename = FilenameTemplate;

/** Customize the main hot update filename. */
export type HotUpdateMainFilename = FilenameTemplate;

/** Which uses JSONP for loading hot updates. */
export type HotUpdateGlobal = string;

/** A unique name of the Rspack build */
export type UniqueName = string;

/** The global variable is used by Rspack for loading chunks. */
export type ChunkLoadingGlobal = string;

/** List of library types enabled for use by entry points. */
export type EnabledLibraryTypes = string[];

/** Whether delete all files in the output directory. */
export type Clean = boolean;

/** Output JavaScript files as module type. */
export type OutputModule = boolean;

/** Tell Rspack to remove a module from the module instance cache (require.cache) if it throws an exception when it is required. */
export type StrictModuleExceptionHandling = boolean;

/** Handle error in module loading as per EcmaScript Modules spec at a performance cost. */
export type StrictModuleErrorHandling = boolean;

/** Indicates what global object will be used to mount the library. */
export type GlobalObject = string;

/** List of wasm loading types enabled for use by entry points. */
export type EnabledWasmLoadingTypes = string[];

/** The name of the native import() function. */
export type ImportFunctionName = string;

/** The name of the native import.meta object. */
export type ImportMetaName = string;

/** Tells Rspack to add IIFE wrapper around emitted code. */
export type Iife = boolean;

/** List of chunk loading types enabled for use by entry points. */
export type EnabledChunkLoadingTypes = string[];

/** The format of chunks */
export type ChunkFormat = string | false;

/** Set a public path for Worker. */
export type WorkerPublicPath = string;

/** Controls [Trusted Types](https://web.dev/articles/trusted-types) compatibility. */
export type TrustedTypes = {
	policyName?: string;
};

/** The encoding to use when generating the hash. */
export type HashDigest = string;

/** The prefix length of the hash digest to use. */
export type HashDigestLength = number;

/** The hashing algorithm to use. */
export type HashFunction = "md4" | "xxhash64";

/** An optional salt to update the hash. */
export type HashSalt = string;

/** Configure how source maps are named. */
export type SourceMapFilename = string;

/** This option determines the module's namespace */
export type DevtoolNamespace = string;

/** This option is only used when devtool uses an option that requires module names. */
export type DevtoolModuleFilenameTemplate = string | ((info: any) => any);

/** A fallback is used when the template string or function above yields duplicates. */
export type DevtoolFallbackModuleFilenameTemplate =
	DevtoolModuleFilenameTemplate;

/** Tell Rspack what kind of ES-features may be used in the generated runtime-code. */
export type Environment = {
	/** The environment supports arrow functions ('() => { ... }'). */
	arrowFunction?: boolean;

	/** The environment supports async function and await ('async function () { await ... }'). */
	asyncFunction?: boolean;

	/** The environment supports BigInt as literal (123n). */
	bigIntLiteral?: boolean;

	/** The environment supports const and let for variable declarations. */
	const?: boolean;

	/** The environment supports destructuring ('{ a, b } = obj'). */
	destructuring?: boolean;

	/** The environment supports 'document' variable. */
	document?: boolean;

	/** The environment supports an async import() function to import EcmaScript modules. */
	dynamicImport?: boolean;

	/** The environment supports an async import() when creating a worker, only for web targets at the moment. */
	dynamicImportInWorker?: boolean;

	/** The environment supports 'for of' iteration ('for (const x of array) { ... }'). */
	forOf?: boolean;

	/** The environment supports 'globalThis'. */
	globalThis?: boolean;

	/** The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...'). */
	module?: boolean;

	/**
	 * Determines if the node: prefix is generated for core module imports in environments that support it.
	 * This is only applicable to Webpack runtime code.
	 * */
	nodePrefixForCoreModules?: boolean;

	/** The environment supports optional chaining ('obj?.a' or 'obj?.()'). */
	optionalChaining?: boolean;

	/** The environment supports template literals. */
	templateLiteral?: boolean;
};

export type Output = {
	/**
	 * The output directory as an absolute path.
	 * @default path.resolve(process.cwd(), 'dist')
	 * */
	path?: Path;

	/**
	 * Tells Rspack to include comments in bundles with information about the contained modules.
	 * @default true
	 */
	pathinfo?: Pathinfo;

	/**
	 * Before generating the products, whether delete all files in the output directory.
	 * @default false
	 * */
	clean?: Clean;

	/** This option determines the URL prefix of the referenced resource, such as: image, file, etc. */
	publicPath?: PublicPath;

	/** This option determines the name of each output bundle. */
	filename?: Filename;

	/** This option determines the name of non-initial chunk files. */
	chunkFilename?: ChunkFilename;

	/** Allows you to set the [crossorigin attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for dynamically loaded chunks. */
	crossOriginLoading?: CrossOriginLoading;

	/** This option determines the name of CSS output files on disk. */
	cssFilename?: CssFilename;

	/**
	 * Rspack adds some metadata in CSS to parse CSS modules, and this configuration determines whether to compress these metadata.
	 *
	 * The value is `true` in production mode.
	 * The value is `false` in development mode.
	 * */
	cssHeadDataCompression?: boolean;

	/** This option determines the name of non-initial CSS output files on disk. */
	cssChunkFilename?: CssChunkFilename;

	/**
	 * Customize the main hot update filename. [fullhash] and [runtime] are available as placeholder.
	 * @default '[runtime].[fullhash].hot-update.json'
	 * */
	hotUpdateMainFilename?: HotUpdateMainFilename;

	/**
	 * Customize the filenames of hot update chunks.
	 * @default '[id].[fullhash].hot-update.js'
	 * */
	hotUpdateChunkFilename?: HotUpdateChunkFilename;

	/**
	 * Only used when target is set to 'web', which uses JSONP for loading hot updates.
	 * @default 'webpackHotUpdate' + output.uniqueName
	 * */
	hotUpdateGlobal?: HotUpdateGlobal;

	/**
	 * This option determines the name of each asset modules.
	 * @default '[hash][ext][query]'
	 * */
	assetModuleFilename?: AssetModuleFilename;

	/** A unique name of the Rspack build to avoid multiple Rspack runtimes to conflict when using globals. */
	uniqueName?: UniqueName;

	/**
	 * The global variable is used by Rspack for loading chunks.
	 * Determined by output.uniqueName default.
	 * */
	chunkLoadingGlobal?: ChunkLoadingGlobal;

	/**
	 * List of library types enabled for use by entry points.
	 * Determined by output.library and Entry default.
	 * */
	enabledLibraryTypes?: EnabledLibraryTypes;

	/** Output a library exposing the exports of your entry point. */
	library?: Library;

	/**
	 * Specify which export should be exposed as a library.
	 * @deprecated We might drop support for this, so prefer to use output.library.export
	 * */
	libraryExport?: LibraryExport;

	/**
	 * Configure how the library will be exposed.
	 * @deprecated Use output.library.type instead as we might drop support for output.libraryTarget in the future.
	 * */
	libraryTarget?: LibraryType;

	/**
	 * When using output.library.type: "umd", setting output.umdNamedDefine to true will name the AMD module of the UMD build.
	 * @deprecated Use output.library.umdNamedDefine instead.
	 */
	umdNamedDefine?: UmdNamedDefine;

	/**
	 * Add a comment in the UMD wrapper.
	 * @deprecated use output.library.auxiliaryComment instead.
	 * */
	auxiliaryComment?: AuxiliaryComment;

	/**
	 * Output JavaScript files as module type.
	 * Disabled by default as it's an experimental feature. To use it, you must set experiments.outputModule to true.
	 * @default false
	 */
	module?: OutputModule;

	/** Tell Rspack to remove a module from the module instance cache (require.cache) if it throws an exception when it is required. */
	strictModuleExceptionHandling?: StrictModuleExceptionHandling;

	/**
	 * Handle error in module loading as per EcmaScript Modules spec at a performance cost.
	 * @default false
	 * */
	strictModuleErrorHandling?: StrictModuleErrorHandling;

	/**
	 * When targeting a library, especially when library.type is 'umd', this option indicates what global object will be used to mount the library.
	 * @default 'self'
	 */
	globalObject?: GlobalObject;

	/**
	 * The name of the native import() function.
	 * @default 'import'
	 * */
	importFunctionName?: ImportFunctionName;

	/**
	 * The name of the native import.meta object (can be exchanged for a polyfill).
	 * @default 'import.meta'
	 */
	importMetaName?: ImportMetaName;

	/**
	 * Tells Rspack to add IIFE wrapper around emitted code.
	 * @default true
	 */
	iife?: Iife;

	/**
	 * Option to set the method of loading WebAssembly Modules.
	 * @default 'fetch'
	 * */
	wasmLoading?: WasmLoading;

	/** List of wasm loading types enabled for use by entry points. */
	enabledWasmLoadingTypes?: EnabledWasmLoadingTypes;

	/**
	 * Specifies the filename of WebAssembly modules.
	 * @default '[hash].module.wasm'
	 * */
	webassemblyModuleFilename?: WebassemblyModuleFilename;

	/** The format of chunks (formats included by default are 'array-push' (web/webworker), 'commonjs' (node.js), 'module' (ESM). */
	chunkFormat?: ChunkFormat;

	/** The method to load chunks (methods included by default are 'jsonp' (web), 'import' (ESM), 'importScripts' (webworker), 'require' (sync node.js), 'async-node' (async node.js) */
	chunkLoading?: ChunkLoading;

	/** List of chunk loading types enabled for use by entry points. */
	enabledChunkLoadingTypes?: EnabledChunkLoadingTypes;

	/** Controls [Trusted Types](https://web.dev/articles/trusted-types) compatibility. */
	trustedTypes?: true | string | TrustedTypes;

	/**
	 * Configure how source maps are named.
	 * Only takes effect when devtool is set to 'source-map', which writes an output file.
	 * @default '[file].map[query]'
	 * */
	sourceMapFilename?: SourceMapFilename;

	/** The encoding to use when generating the hash. */
	hashDigest?: HashDigest;

	/**
	 * The prefix length of the hash digest to use.
	 * @default 20
	 * */
	hashDigestLength?: HashDigestLength;

	/**
	 * The hashing algorithm to use.
	 * @default 'md4'
	 * */
	hashFunction?: HashFunction;

	/** An optional salt to update the hash. */
	hashSalt?: HashSalt;

	/**
	 * Create async chunks that are loaded on demand.
	 * @default true
	 * */
	asyncChunks?: AsyncChunks;

	/**
	 * The new option workerChunkLoading controls the chunk loading of workers.
	 * @default false
	 * */
	workerChunkLoading?: ChunkLoading;

	/**
	 * Option to set the method of loading WebAssembly Modules in workers, defaults to the value of output.wasmLoading.
	 * @default false
	 * */
	workerWasmLoading?: WasmLoading;

	/** Set a public path for Worker, defaults to value of output.publicPath. */
	workerPublicPath?: WorkerPublicPath;

	/**
	 * This option allows loading asynchronous chunks with a custom script type.
	 * @default false
	 * */
	scriptType?: ScriptType;

	/** This option determines the module's namespace used with the output.devtoolModuleFilenameTemplate */
	devtoolNamespace?: DevtoolNamespace;

	/** This option is only used when devtool uses an option that requires module names. */
	devtoolModuleFilenameTemplate?: DevtoolModuleFilenameTemplate;

	/** A fallback is used when the template string or function above yields duplicates. */
	devtoolFallbackModuleFilenameTemplate?: DevtoolFallbackModuleFilenameTemplate;

	/**
	 * The Number of milliseconds before chunk request timed out.
	 * @default 120000
	 * */
	chunkLoadTimeout?: number;

	/**
	 * Add charset="utf-8" to the HTML <script> tag.
	 * @default true
	 * */
	charset?: boolean;

	/** Tell Rspack what kind of ES-features may be used in the generated runtime-code. */
	environment?: Environment;
};

//#endregion

//#region Resolve
/**
 * Path alias
 * @example
 * ```js
 * {
 * 	"@": path.resolve(__dirname, './src'),
 * 	"abc$": path.resolve(__dirname, './node_modules/abc/index.js'),
 * }
 * // - require("@/a") will attempt to resolve <root>/src/a.
 * // - require("abc") will attempt to resolve <root>/src/abc.
 * // - require("abc/file.js") will not match, and it will attempt to resolve node_modules/abc/file.js.
 * ```
 * */
export type ResolveAlias = {
	[x: string]: string | false | (string | false)[];
};

/** The replacement of [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) in Rspack. */
export type ResolveTsConfig =
	| string
	| {
			configFile: string;
			references?: string[] | "auto" | undefined;
	  };

/** Used to configure the Rspack module resolution */
export type ResolveOptions = {
	/** Path alias */
	alias?: ResolveAlias;

	/** Same as node's [conditionNames](https://nodejs.org/api/packages.html#conditional-exports) for the exports and imports fields in package.json. */
	conditionNames?: string[];

	/**
	 * Parse modules in order.
	 * @default [".js", ".json", ".wasm"]
	 * */
	extensions?: string[];

	/** Redirect module requests when normal resolving fails. */
	fallback?: ResolveAlias;

	/** Try to parse the fields in package.json */
	mainFields?: string[];

	/**
	 * The filename suffix when resolving directories, e.g. require('. /dir/') will try to resolve '. /dir/index'.
	 * @default ['index']
	 */
	mainFiles?: string[];

	/**
	 * The name of the directory to use when resolving dependencies.
	 * @default ["node_modules"]
	 */
	modules?: string[];

	/**
	 * When enabled, require('file') will first look for the . /file file in the current directory, not <modules>/file.
	 * @default false
	 */
	preferRelative?: boolean;

	/**
	 * Opt for absolute paths when resolving, in relation to resolve.roots.
	 * @default false
	 */
	preferAbsolute?: boolean;

	/**
	 * Whether to resolve symlinks to their symlinked location.
	 * @default true
	 */
	symlinks?: boolean;

	/**
	 * By default, It changes to true if resolve.extensions contains an empty string;
	 * otherwise, this value changes to false.
	 */
	enforceExtension?: boolean;

	/**
	 * Customize the imports field in package.json which are used to provide the internal requests of a package (requests starting with # are considered internal).
	 * @default ["imports"]
	 */
	importsFields?: string[];

	/**
	 * The JSON files to use for descriptions.
	 * @default ['package.json']
	 */
	descriptionFiles?: string[];

	/** The replacement of [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) in Rspack. */
	tsConfig?: ResolveTsConfig;

	/**
	 * No longer resolve extensions, no longer resolve mainFiles in package.json (but does not affect requests from mainFiles, browser, alias).
	 * @default false
	 * */
	fullySpecified?: boolean;

	/**
	 * Customize the exports field in package.json.
	 * @default ["exports"]
	 * */
	exportsFields?: string[];

	/** Define alias for the extension. */
	extensionAlias?: Record<string, string | string[]>;

	/**
	 * Define a field, such as browser, that should be parsed in accordance with this [specification](https://github.com/defunctzombie/package-browser-field-spec).
	 * @default ['browser']
	 * */
	aliasFields?: string[];

	/**
	 * A list of resolve restrictions to restrict the paths that a request can be resolved on.
	 * @default []
	 * */
	restrictions?: string[];

	/**
	 * A list of directories where server-relative URLs (beginning with '/') are resolved.
	 * It defaults to the context configuration option.
	 * On systems other than Windows, these requests are initially resolved as an absolute path.
	 * @default []
	 */
	roots?: string[];

	/** Customize the Resolve configuration based on the module type. */
	byDependency?: Record<string, ResolveOptions>;
};

/** Used to configure the Rspack module resolution */
export type Resolve = ResolveOptions;
//#endregion

//#region Module
export type RuleSetCondition =
	| string
	| RegExp
	| ((value: string) => boolean)
	| RuleSetConditions
	| RuleSetLogicalConditions;

export type RuleSetConditions = RuleSetCondition[];

export type RuleSetLogicalConditions = {
	and?: RuleSetConditions;
	or?: RuleSetConditions;
	not?: RuleSetCondition;
};

export type RuleSetLoader = string;

export type RuleSetLoaderOptions = string | Record<string, any>;

export type RuleSetLoaderWithOptions = {
	ident?: string;

	loader: RuleSetLoader;

	options?: RuleSetLoaderOptions;
};

export type RuleSetUseItem = RuleSetLoader | RuleSetLoaderWithOptions;

export type RuleSetUse =
	| RuleSetUseItem
	| RuleSetUseItem[]
	| ((data: RawFuncUseCtx) => RuleSetUseItem[]);

/** Rule defines the conditions for matching a module and the behavior of handling those modules. */
export type RuleSetRule = {
	/** Matches all modules that match this resource, and will match against Resource. */
	test?: RuleSetCondition;

	/** Excludes all modules that match this condition and will match against the absolute path of the resource */
	exclude?: RuleSetCondition;

	/** Matches all modules that match this condition against the absolute path of the resource */
	include?: RuleSetCondition;

	/** Matches all modules that match this resource, and will match against Resource */
	issuer?: RuleSetCondition;

	/** Matches all modules that match this resource, and will match against layer of the module that issued the current module. */
	issuerLayer?: RuleSetCondition;

	/** Matches all modules that match this resource, and will match against the category of the dependency that introduced the current module */
	dependency?: RuleSetCondition;

	/** Matches all modules that match this resource, and will match against Resource */
	resource?: RuleSetCondition;

	/** Matches all modules that match this resource against the Resource's fragment. */
	resourceFragment?: RuleSetCondition;

	/** Matches all modules that match this resource against the Resource's query. */
	resourceQuery?: RuleSetCondition;

	/** Matches all modules that match this resource, and will match against the Resource's mimetype. */
	mimetype?: RuleSetCondition;

	/** Matches all modules that match this resource, and will match against the Resource's scheme. */
	scheme?: RuleSetCondition;

	/** Allows you to match values of properties in the description file, typically package.json, to determine which modules a rule should apply to. */
	descriptionData?: Record<string, RuleSetCondition>;

	/** Used in conjunction with [import attributes](https://github.com/tc39/proposal-import-attributes). */
	with?: Record<string, RuleSetCondition>;

	/** Used to mark the type of the matching module, which affects how the module is handled by Rspack's built-in processing. */
	type?: string;

	/** Used to mark the layer of the matching module. */
	layer?: string;

	/** A loader name */
	loader?: RuleSetLoader;

	/** A loader options */
	options?: RuleSetLoaderOptions;

	/** An array to pass the Loader package name and its options.  */
	use?: RuleSetUse;

	/**
	 * Parser options for the specific modules that matched by the rule conditions
	 * It will override the parser options in module.parser.
	 * @default {}
	 * */
	parser?: Record<string, any>;

	/**
	 * Generator options for the specific modules that matched by the rule conditions
	 * It will override the parser options in module.generator.
	 * @default {}
	 */
	generator?: Record<string, any>;

	/** Matches all modules that match this resource, and will match against Resource. */
	resolve?: ResolveOptions;

	/** Flag the module for side effects */
	sideEffects?: boolean;

	/** Specify loader category.  */
	enforce?: "pre" | "post";

	/** A kind of Nested Rule, an array of Rules from which only the first matching Rule is used when the parent Rule matches. */
	oneOf?: RuleSetRule[];

	/** A kind of Nested Rule, an array of Rules that is also used when the parent Rule matches. */
	rules?: RuleSetRule[];
};

/** A list of rules. */
export type RuleSetRules = ("..." | RuleSetRule | Falsy)[];

/**
 * Options object for DataUrl condition.
 * */
export type AssetParserDataUrlOptions = {
	maxSize?: number | undefined;
};

/**
 * Options object for DataUrl condition.
 * */
export type AssetParserDataUrl = AssetParserDataUrlOptions;

/** Options object for `asset` modules. */
export type AssetParserOptions = {
	/**
	 * It be used only for Asset Module scenarios.
	 * @default { maxSize: 8096 }
	 * */
	dataUrlCondition?: AssetParserDataUrlOptions;
};

export type CssParserNamedExports = boolean;

/** Options object for `css` modules. */
export type CssParserOptions = {
	/**
	 * Use ES modules named export for CSS exports.
	 * @default true
	 * */
	namedExports?: CssParserNamedExports;
};

/** Options object for `css/auto` modules. */
export type CssAutoParserOptions = {
	/**
	 * Use ES modules named export for CSS exports.
	 * @default true
	 * */
	namedExports?: CssParserNamedExports;
};

/** Options object for `css/module` modules. */
export type CssModuleParserOptions = {
	/**
	 * Use ES modules named export for CSS exports.
	 * @default true
	 * */
	namedExports?: CssParserNamedExports;
};

type ExportsPresence = "error" | "warn" | "auto" | false;

export type JavascriptParserOptions = {
	/**
	 * Specifies global mode for dynamic import.
	 * @default 'lazy'
	 * */
	dynamicImportMode?: "eager" | "lazy" | "weak" | "lazy-once";

	/**
	 * Specifies global preload for dynamic import.
	 * @default false
	 * */
	dynamicImportPreload?: boolean | number;

	/**
	 * Specifies global prefetch for dynamic import
	 * @default false
	 * */
	dynamicImportPrefetch?: boolean | number;

	/**
	 * Specifies global fetchPriority for dynamic import
	 * @default 'auto'
	 */
	dynamicImportFetchPriority?: "low" | "high" | "auto";

	/**
	 * Enable or disable evaluating import.meta.
	 * @default true
	 */
	importMeta?: boolean;

	/**
	 * Enable parsing of new URL() syntax.
	 * @default true
	 * */
	url?: "relative" | boolean;

	/**
	 * Enable warnings for full dynamic dependencies
	 * @default true
	 * */
	exprContextCritical?: boolean;

	/**
	 * Enable warnings for partial dynamic dependencies
	 * @default false
	 * */
	wrappedContextCritical?: boolean;

	/**
	 * Warn or error for using non-existent exports and conflicting re-exports.
	 * @default 'auto'
	 */
	exportsPresence?: ExportsPresence;

	/** Warn or error for using non-existent exports */
	importExportsPresence?: ExportsPresence;

	/** Warn or error for conflicting re-exports */
	reexportExportsPresence?: ExportsPresence;

	/** Emit errors instead of warnings when imported names don't exist in imported module. */
	strictExportPresence?: boolean;

	/** Provide custom syntax for Worker parsing, commonly used to support Worklet */
	worker?: string[] | boolean;

	/** Override the module to strict or non-strict. */
	overrideStrict?: "strict" | "non-strict";

	// TODO: add docs
	requireAsExpression?: boolean;

	// TODO: add docs
	requireDynamic?: boolean;

	// TODO: add docs
	requireResolve?: boolean;

	// TODO: add docs
	importDynamic?: boolean;
};

/** Configure all parsers' options in one place with module.parser. */
export type ParserOptionsByModuleTypeKnown = {
	/** Parser options for `asset` modules. */
	asset?: AssetParserOptions;

	/** Parser options for `css` modules. */
	css?: CssParserOptions;

	/** Parser options for `css/auto` modules. */
	"css/auto"?: CssAutoParserOptions;

	/** Parser options for `css/module` modules. */
	"css/module"?: CssModuleParserOptions;

	/** Parser options for `javascript` modules. */
	javascript?: JavascriptParserOptions;

	/** Parser options for `javascript/auto` modules. */
	"javascript/auto"?: JavascriptParserOptions;

	/** Parser options for `javascript/dynamic` modules. */
	"javascript/dynamic"?: JavascriptParserOptions;

	/** Parser options for `javascript/esm` modules. */
	"javascript/esm"?: JavascriptParserOptions;
};

/** Configure all parsers' options in one place with module.parser. */
export type ParserOptionsByModuleTypeUnknown = {
	[x: string]: Record<string, any>;
};

/** Configure all parsers' options in one place with module.parser. */
export type ParserOptionsByModuleType =
	| ParserOptionsByModuleTypeKnown
	| ParserOptionsByModuleTypeUnknown;

export type AssetGeneratorDataUrlOptions = {
	encoding?: false | "base64";
	mimetype?: string;
};

export type AssetGeneratorDataUrlFunction = (options: {
	filename: string;
	content: string;
}) => string;

export type AssetGeneratorDataUrl =
	| AssetGeneratorDataUrlOptions
	| AssetGeneratorDataUrlFunction;

/** Options for asset inline modules. */
export type AssetInlineGeneratorOptions = {
	/** Only for modules with module type 'asset' or 'asset/inline'. */
	dataUrl?: AssetGeneratorDataUrl;
};

/** Options for asset modules. */
export type AssetResourceGeneratorOptions = {
	/**
	 * Whether to output assets to disk.
	 * @default true
	 * */
	emit?: boolean;

	/** This option determines the name of each asset resource output bundle.*/
	filename?: Filename;

	/** This option determines the URL prefix of the referenced 'asset' or 'asset/resource'*/
	publicPath?: PublicPath;
};

/** Generator options for asset modules. */
export type AssetGeneratorOptions = AssetInlineGeneratorOptions &
	AssetResourceGeneratorOptions;

export type CssGeneratorExportsConvention =
	| "as-is"
	| "camel-case"
	| "camel-case-only"
	| "dashes"
	| "dashes-only";

export type CssGeneratorExportsOnly = boolean;

export type CssGeneratorLocalIdentName = string;

export type CssGeneratorEsModule = boolean;

/** Generator options for css modules. */
export type CssGeneratorOptions = {
	/**
	 * If true, only exports the identifier mappings from CSS into the output JavaScript files
	 * If false, generate stylesheets and embed them in the template.
	 */
	exportsOnly?: CssGeneratorExportsOnly;

	/** This configuration is available for improved ESM-CJS interoperability purposes. */
	esModule?: CssGeneratorEsModule;
};

/** Generator options for css/auto modules. */
export type CssAutoGeneratorOptions = {
	/**
	 * Customize how CSS export names are exported to javascript modules
	 * @default 'as-is'
	 * */
	exportsConvention?: CssGeneratorExportsConvention;

	/**
	 * If true, only exports the identifier mappings from CSS into the output JavaScript files
	 * If false, generate stylesheets and embed them in the template.
	 */
	exportsOnly?: CssGeneratorExportsOnly;

	/** Customize the format of the local class names generated for CSS modules */
	localIdentName?: CssGeneratorLocalIdentName;

	/** This configuration is available for improved ESM-CJS interoperability purposes. */
	esModule?: CssGeneratorEsModule;
};

/** Generator options for css/module modules. */
export type CssModuleGeneratorOptions = CssAutoGeneratorOptions;

export type GeneratorOptionsByModuleTypeKnown = {
	/** Generator options for asset modules. */
	asset?: AssetGeneratorOptions;

	/** Generator options for asset/inline modules. */
	"asset/inline"?: AssetInlineGeneratorOptions;

	/** Generator options for asset/resource modules. */
	"asset/resource"?: AssetResourceGeneratorOptions;

	/** Generator options for css modules. */
	css?: CssGeneratorOptions;

	/** Generator options for css/auto modules. */
	"css/auto"?: CssAutoGeneratorOptions;

	/** Generator options for css/module modules. */
	"css/module"?: CssModuleGeneratorOptions;
};

export type GeneratorOptionsByModuleTypeUnknown = Record<
	string,
	Record<string, any>
>;

/** Options for module.generator */
export type GeneratorOptionsByModuleType =
	| GeneratorOptionsByModuleTypeKnown
	| GeneratorOptionsByModuleTypeUnknown;

type NoParseOptionSingle = string | RegExp | ((request: string) => boolean);

/** Options for module.noParse */
export type NoParseOption = NoParseOptionSingle | NoParseOptionSingle[];

export type ModuleOptions = {
	/** Used to decide how to handle different types of modules in a project. */
	defaultRules?: RuleSetRules;

	/**
	 * An array of rules that match the module's requests when it is created.
	 * @default []
	 * */
	rules?: RuleSetRules;

	/**
	 * Configure all parsers' options in one place with module.parser.
	 * @default {}
	 * */
	parser?: ParserOptionsByModuleType;

	/** Configure all generators' options in one place with module.generator. */
	generator?: GeneratorOptionsByModuleType;

	/** Keep module mechanism of the matched modules as-is, such as module.exports, require, import. */
	noParse?: NoParseOption;
};

//#endregion

//#region ExternalsType
/**
 * Specify the default type of externals.
 * `amd`, `umd`, `system` and `jsonp` externals depend on the `output.libraryTarget` being set to the same value e.g. you can only consume amd externals within an amd library.
 * @default 'var'
 */
export type ExternalsType =
	| "var"
	| "module"
	| "assign"
	| "this"
	| "window"
	| "self"
	| "global"
	| "commonjs"
	| "commonjs2"
	| "commonjs-module"
	| "commonjs-static"
	| "amd"
	| "amd-require"
	| "umd"
	| "umd2"
	| "jsonp"
	| "system"
	| "promise"
	| "import"
	| "module-import"
	| "script"
	| "node-commonjs";
//#endregion

//#region Externals
/**
 * The dependency used for the external.
 */
export type ExternalItemValue =
	| string
	| boolean
	| string[]
	| Record<string, string | string[]>;

/**
 * If an dependency matches exactly a property of the object, the property value is used as dependency.
 */
export type ExternalItemObjectUnknown = {
	[x: string]: ExternalItemValue;
};

/**
 * Data object passed as argument when a function is set for 'externals'.
 */
export type ExternalItemFunctionData = {
	context?: string;
	dependencyType?: string;
	request?: string;
	contextInfo?: {
		issuer: string;
	};
};

/**
 * Prevent bundling of certain imported package and instead retrieve these external dependencies at runtime.
 *
 * @example
 * ```js
 * // jquery lib will be excluded from bundling.
 * module.exports = {
 * 	externals: {
 * 		jquery: 'jQuery',
 * 	}
 * }
 * ```
 * */
export type ExternalItem =
	| string
	| RegExp
	| ExternalItemObjectUnknown
	| ((
			data: ExternalItemFunctionData,
			callback: (
				err?: Error,
				result?: ExternalItemValue,
				type?: ExternalsType
			) => void
	  ) => void)
	| ((data: ExternalItemFunctionData) => Promise<ExternalItemValue>);

/**
 * Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime.
 *
 * @example
 * ```js
 * // jquery lib will be excluded from bundling.
 * module.exports = {
 * 	externals: {
 * 		jquery: 'jQuery',
 * 	}
 * }
 * ```
 * */
export type Externals = ExternalItem | ExternalItem[];
//#endregion

//#region Plugins
export interface RspackPluginInstance {
	apply: (compiler: Compiler) => void;
	[k: string]: any;
}

export type RspackPluginFunction = (this: Compiler, compiler: Compiler) => void;

// The Compiler type of webpack is not exactly the same as Rspack.
// It is allowed to use webpack plugins in in the Rspack config,
// so we have defined a loose type here to adapt to webpack plugins.
export type WebpackCompiler = any;

export interface WebpackPluginInstance {
	apply: (compiler: WebpackCompiler) => void;
	[k: string]: any;
}

export type WebpackPluginFunction = (
	this: WebpackCompiler,
	compiler: WebpackCompiler
) => void;

export type Plugin =
	| RspackPluginInstance
	| RspackPluginFunction
	| WebpackPluginInstance
	| WebpackPluginFunction
	| Falsy;

export type Plugins = Plugin[];
//#endregion

//#region Optimization
/** Used to control how the runtime chunk is generated. */

export type OptimizationRuntimeChunk =
	| boolean
	| "single"
	| "multiple"
	| {
			name?: string | ((value: { name: string }) => string);
	  };

export type OptimizationSplitChunksNameFunction = (module?: Module) => unknown;

type OptimizationSplitChunksName =
	| string
	| false
	| OptimizationSplitChunksNameFunction;

type OptimizationSplitChunksSizes = number | Record<string, number>;

type OptimizationSplitChunksChunks =
	| "initial"
	| "async"
	| "all"
	| RegExp
	| ((chunk: Chunk) => boolean);

type SharedOptimizationSplitChunksCacheGroup = {
	/**
	 * This indicates which chunks will be selected for optimization.
	 * @default 'async''
	 * */
	chunks?: OptimizationSplitChunksChunks;

	/** Sets the size types which are used when a number is used for sizes. */
	defaultSizeTypes?: string[];

	/**
	 * The minimum times must a module be shared among chunks before splitting.
	 * @default 1
	 */
	minChunks?: number;

	/**
	 * Enabling this, the splitting of chunks will be grouped based on the usage of modules exports in different runtimes,
	 * ensuring the optimal loading size in each runtime.
	 */
	usedExports?: boolean;

	/**
	 * The name of the split chunk.
	 * @default false
	 * */
	name?: false | OptimizationSplitChunksName;

	/**
	 * Minimum size, in bytes, for a chunk to be generated.
	 *
	 * The value is `20000` in production mode.
	 * The value is `10000` in others mode.
	 */
	minSize?: OptimizationSplitChunksSizes;

	/** Maximum size, in bytes, for a chunk to be generated. */
	maxSize?: OptimizationSplitChunksSizes;

	/** Maximum size, in bytes, for a async chunk to be generated. */
	maxAsyncSize?: OptimizationSplitChunksSizes;

	/** Maximum size, in bytes, for a initial chunk to be generated. */
	maxInitialSize?: OptimizationSplitChunksSizes;

	/**
	 * Maximum number of parallel requests when on-demand loading.
	 * @default 30
	 * */
	maxAsyncRequests?: number;

	/**
	 * Maximum number of parallel requests at an entry point.
	 * @default 30
	 */
	maxInitialRequests?: number;

	/**
	 * Tell Rspack what delimiter to use for the generated names.
	 *
	 * @default '-''
	 */
	automaticNameDelimiter?: string;
};

/** How to splitting chunks. */
export type OptimizationSplitChunksCacheGroup = {
	/** Controls which modules are selected by this cache group. */
	test?: string | RegExp | ((module: Module) => unknown);

	/**
	 * A module can belong to multiple cache groups.
	 * @default -20
	 */
	priority?: number;

	/**
	 * Tells Rspack to ignore `splitChunks.minSize`, `splitChunks.minChunks`, `splitChunks.maxAsyncRequests` and `splitChunks.maxInitialRequests` options and always create chunks for this cache group.
	 */
	enforce?: boolean;

	/** Allows to override the filename when and only when it's an initial chunk. */
	filename?: string;

	/**
	 * Whether to reuse existing chunks when possible.
	 * @default false
	 * */
	reuseExistingChunk?: boolean;

	/** Allows to assign modules to a cache group by module type. */
	type?: string | RegExp;

	/** Sets the hint for chunk id. It will be added to chunk's filename. */
	idHint?: string;
} & SharedOptimizationSplitChunksCacheGroup;

/** Tell Rspack how to splitting chunks. */
export type OptimizationSplitChunksOptions = {
	/**
	 * Options for module cache group
	 * */
	cacheGroups?: Record<string, false | OptimizationSplitChunksCacheGroup>;

	/**
	 * Options for modules not selected by any other group.
	 */
	fallbackCacheGroup?: {
		chunks?: OptimizationSplitChunksChunks;
		minSize?: number;
		maxSize?: number;
		maxAsyncSize?: number;
		maxInitialSize?: number;
		automaticNameDelimiter?: string;
	};

	/**
	 * Prevents exposing path info when creating names for parts splitted by maxSize.
	 *
	 * The value is `true` in production mode.
	 * The value is `false` in development mode.
	 * */
	hidePathInfo?: boolean;
} & SharedOptimizationSplitChunksCacheGroup;

export type Optimization = {
	/**
	 * Which algorithm to use when choosing module ids.
	 */
	moduleIds?: "named" | "natural" | "deterministic";

	/**
	 * Which algorithm to use when choosing chunk ids.
	 */
	chunkIds?: "natural" | "named" | "deterministic";

	/**
	 * Whether to minimize the bundle.
	 * The value is `true` in production mode.
	 * The value is `false` in development mode.
	 */
	minimize?: boolean;

	/**
	 * Customize the minimizer.
	 * By default, `rspack.SwcJsMinimizerRspackPlugin` and `rspack.LightningCssMinimizerRspackPlugin` are used.
	 */
	minimizer?: Array<"..." | Plugin>;

	/**
	 * Whether to merge chunks which contain the same modules.
	 * Setting optimization.mergeDuplicateChunks to false will disable this optimization.
	 * @default true
	 */
	mergeDuplicateChunks?: boolean;

	/**
	 * Support splitting chunks.
	 * It is enabled by default for dynamically imported modules.
	 * To turn it off, set it to false.
	 * */
	splitChunks?: false | OptimizationSplitChunksOptions;

	/**
	 * Used to control how the runtime chunk is generated.
	 * Setting it to true or 'multiple' will add an additional chunk containing only the runtime for each entry point.
	 * Setting it to 'single' will extract the runtime code of all entry points into a single separate chunk.
	 * @default false
	 */
	runtimeChunk?: OptimizationRuntimeChunk;

	/** Detect and remove modules from chunks these modules are already included in all parents. */
	removeAvailableModules?: boolean;

	/**
	 * Remove empty chunks generated in the compilation.
	 * @default true
	 * */
	removeEmptyChunks?: boolean;

	/**
	 * Adds an additional hash compilation pass after the assets have been processed to get the correct asset content hashes.
	 *
	 * The value is `true` in production mode.
	 * The value is `false` in development mode.
	 */
	realContentHash?: boolean;

	/**
	 * Tells Rspack to recognise the sideEffects flag in package.json or rules to skip over modules which are flagged to contain no side effects when exports are not used.
	 *
	 * The value is `true` in production mode.
	 * The value is `false` in development mode.
	 * */
	sideEffects?: "flag" | boolean;

	/**
	 * After enabling, Rspack will analyze which exports the module provides, including re-exported modules.
	 * @default true
	 * */
	providedExports?: boolean;

	/**
	 * Tells Rspack to find segments of the module graph which can be safely concatenated into a single module.
	 *
	 * The value is `true` in production mode.
	 * The value is `false` in development mode.
	 */
	concatenateModules?: boolean;

	/**
	 * Tells Rspack whether to perform a more detailed analysis of variable assignments.
	 *
	 * The value is `true` in production mode.
	 * The value is `false` in development mode.
	 */
	innerGraph?: boolean;

	/**
	 * Tells Rspack to determine used exports for each module.
	 *
	 * The value is `true` in production mode.
	 * The value is `false` in development mode.
	 * */
	usedExports?: "global" | boolean;

	/**
	 * Allows to control export mangling.
	 *
	 * The value is `isdeterministic` in production mode.
	 * The value is `false` in development mode.
	 */
	mangleExports?: "size" | "deterministic" | boolean;

	/**
	 * Tells Rspack to set process.env.NODE_ENV to a given string value.
	 * @default false
	 */
	nodeEnv?: string | false;

	/**
	 * Emit assets whenever there are errors while compiling.
	 *
	 * The value is `false` in production mode.
	 * The value is `true` in development mode.
	 * */
	emitOnErrors?: boolean;
};
//#endregion