

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.CkicQth6.js","_app/immutable/chunks/index.BtN87BVB.js","_app/immutable/chunks/vendor.CwTqq7k6.js"];
export const stylesheets = ["_app/immutable/assets/index.CScxpvdQ.css"];
export const fonts = [];
