

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/fixture-event/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.DTrImjLK.js","_app/immutable/chunks/index.DvHIA7iE.js","_app/immutable/chunks/vendor.BMXexJs3.js"];
export const stylesheets = ["_app/immutable/assets/index.-u_DXI70.css"];
export const fonts = [];
