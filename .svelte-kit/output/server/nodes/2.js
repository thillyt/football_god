

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Bg4sd5JD.js","_app/immutable/chunks/index.BJuWJoym.js","_app/immutable/chunks/vendor.BLMaGit4.js"];
export const stylesheets = ["_app/immutable/assets/index.C6ajDQRQ.css"];
export const fonts = [];
