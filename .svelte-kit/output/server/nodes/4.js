

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DEnN8Zys.js","_app/immutable/chunks/index.iamTWUmX.js","_app/immutable/chunks/vendor.DOSvRLiO.js"];
export const stylesheets = ["_app/immutable/assets/index.BX7P7LMc.css"];
export const fonts = [];
