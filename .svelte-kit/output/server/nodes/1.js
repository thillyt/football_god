

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.D3d7-5RT.js","_app/immutable/chunks/index.CFONCfej.js","_app/immutable/chunks/vendor.BdkuDQEJ.js"];
export const stylesheets = ["_app/immutable/assets/index.dzohRDD9.css"];
export const fonts = [];
