

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BuMd5EKo.js","_app/immutable/chunks/index.Bg0A2oTy.js","_app/immutable/chunks/vendor.D-PEOVsX.js"];
export const stylesheets = ["_app/immutable/assets/index.BcCEP8XD.css"];
export const fonts = [];
