

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.NJedaI4E.js","_app/immutable/chunks/index.BGy6ezKk.js","_app/immutable/chunks/vendor.DpDJDq4E.js"];
export const stylesheets = ["_app/immutable/assets/index.CxFGGsA5.css"];
export const fonts = [];
