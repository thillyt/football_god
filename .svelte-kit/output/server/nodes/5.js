

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/lightpaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.6jUW_lXv.js","_app/immutable/chunks/index.BtN87BVB.js","_app/immutable/chunks/vendor.CwTqq7k6.js"];
export const stylesheets = ["_app/immutable/assets/index.CScxpvdQ.css"];
export const fonts = [];
