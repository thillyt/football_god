

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/presale/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.HFZNPw8O.js","_app/immutable/chunks/index.BAyXST7J.js","_app/immutable/chunks/vendor.DmHkI8Py.js"];
export const stylesheets = ["_app/immutable/assets/index.CTG9qjY3.css"];
export const fonts = [];
