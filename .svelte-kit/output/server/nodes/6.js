

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/governance/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.BqNYjsz3.js","_app/immutable/chunks/index.D3lz7L3p.js","_app/immutable/chunks/vendor._nf8l32J.js"];
export const stylesheets = ["_app/immutable/assets/index.C6ajDQRQ.css"];
export const fonts = [];
