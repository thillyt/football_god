

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.LFiNU_ip.js","_app/immutable/chunks/index.C95W9K3k.js","_app/immutable/chunks/vendor.C597RN51.js"];
export const stylesheets = ["_app/immutable/assets/index.3tPCJdae.css"];
export const fonts = [];
