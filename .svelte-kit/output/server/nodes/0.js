

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CytsAm30.js","_app/immutable/chunks/index.TPYDmGT9.js","_app/immutable/chunks/vendor.CQDvisxt.js"];
export const stylesheets = ["_app/immutable/assets/index.CSN47-Hr.css"];
export const fonts = [];
