

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/terms/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.DTv38_t6.js","_app/immutable/chunks/index.SnITFYT6.js","_app/immutable/chunks/vendor.BEsDHGUX.js"];
export const stylesheets = ["_app/immutable/assets/index.BUmMB-3-.css"];
export const fonts = [];
