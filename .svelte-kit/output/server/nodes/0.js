

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DFyU6bTT.js","_app/immutable/chunks/index.Cj7Rp3vF.js","_app/immutable/chunks/vendor.C0IfeU0o.js"];
export const stylesheets = ["_app/immutable/assets/index.D5fZHd_6.css"];
export const fonts = [];
