

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/league/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.BIFS4iiI.js","_app/immutable/chunks/index.CBJyqk93.js","_app/immutable/chunks/vendor.CEn_3AZi.js"];
export const stylesheets = ["_app/immutable/assets/index.C6ajDQRQ.css"];
export const fonts = [];
