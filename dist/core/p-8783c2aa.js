/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
function t(t){const r=t?t.assignedNodes({flatten:true}):[];let e="";[...r].map((t=>{if(t.nodeType===Node.TEXT_NODE){e+=t.textContent}}));return e}function r(t,r){if(r){return t.querySelector(`[slot="${r}"]`)!==null}return[...t.childNodes].some((t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!==""){return true}if(t.nodeType===t.ELEMENT_NODE){const r=t;if(!r.hasAttribute("slot")){return true}}return false}))}export{t as g,r as h};
//# sourceMappingURL=p-8783c2aa.js.map