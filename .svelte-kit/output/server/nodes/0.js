

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DsWgYTSO.js","_app/immutable/chunks/index.BAyXST7J.js","_app/immutable/chunks/vendor.DmHkI8Py.js"];
export const stylesheets = ["_app/immutable/assets/index.CTG9qjY3.css"];
export const fonts = [];
