/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { N as NAMESPACE, r as registerInstance, c as createEvent$1, h as h$1, g as getElement$1 } from './index-e8cb22d3.js';
import { r as renderHiddenInput } from './helpers-d5cf0df0.js';
import { F as FormControl } from './form-control-2d507c68.js';
import { h as hasSlot } from './slot-5e43014a.js';

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/snabbdom/snabbdom/blob/master/LICENSE
 *
 * Modified for Stencil's renderer and slot projection
 */
let scopeId;
let hostTagName;
let isSvgMode = false;
let queuePending = false;
const createTime = (fnName, tagName = '') => {
    {
        return () => {
            return;
        };
    }
};
const uniqueTime = (key, measureText) => {
    {
        return () => {
            return;
        };
    }
};
const CONTENT_REF_ID = 'r';
const ORG_LOCATION_ID = 'o';
const SLOT_NODE_ID = 's';
const TEXT_NODE_ID = 't';
const HYDRATE_ID = 's-id';
const HYDRATED_STYLE_ID = 'sty-id';
const HYDRATE_CHILD_ID = 'c-id';
const XLINK_NS = 'http://www.w3.org/1999/xlink';
/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
const EMPTY_OBJ = {};
/**
 * Namespaces
 */
const SVG_NS = 'http://www.w3.org/2000/svg';
const HTML_NS = 'http://www.w3.org/1999/xhtml';
const isDef = (v) => v != null;
const isComplexType = (o) => {
    // https://jsperf.com/typeof-fn-object/5
    o = typeof o;
    return o === 'object' || o === 'function';
};
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// const stack: any[] = [];
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (nodeName, vnodeData, ...children) => {
    let child = null;
    let key = null;
    let simple = false;
    let lastSimple = false;
    const vNodeChildren = [];
    const walk = (c) => {
        for (let i = 0; i < c.length; i++) {
            child = c[i];
            if (Array.isArray(child)) {
                walk(child);
            }
            else if (child != null && typeof child !== 'boolean') {
                if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                    child = String(child);
                }
                if (simple && lastSimple) {
                    // If the previous child was simple (string), we merge both
                    vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                }
                else {
                    // Append a new vNode, if it's text, we create a text vNode
                    vNodeChildren.push(simple ? newVNode(null, child) : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    if (vnodeData) {
        // normalize class / classname attributes
        if (vnodeData.key) {
            key = vnodeData.key;
        }
        {
            const classData = vnodeData.className || vnodeData.class;
            if (classData) {
                vnodeData.class =
                    typeof classData !== 'object'
                        ? classData
                        : Object.keys(classData)
                            .filter((k) => classData[k])
                            .join(' ');
            }
        }
    }
    if (typeof nodeName === 'function') {
        // nodeName is a functional component
        return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
    }
    const vnode = newVNode(nodeName, null);
    vnode.$attrs$ = vnodeData;
    if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
    }
    {
        vnode.$key$ = key;
    }
    return vnode;
};
const newVNode = (tag, text) => {
    const vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text,
        $elm$: null,
        $children$: null,
    };
    {
        vnode.$attrs$ = null;
    }
    {
        vnode.$key$ = null;
    }
    return vnode;
};
const Host = {};
const isHost = (node) => node && node.$tag$ === Host;
const vdomFnUtils = {
    forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
    map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate),
};
const convertToPublic = (node) => ({
    vattrs: node.$attrs$,
    vchildren: node.$children$,
    vkey: node.$key$,
    vname: node.$name$,
    vtag: node.$tag$,
    vtext: node.$text$,
});
const convertToPrivate = (node) => {
    if (typeof node.vtag === 'function') {
        const vnodeData = Object.assign({}, node.vattrs);
        if (node.vkey) {
            vnodeData.key = node.vkey;
        }
        if (node.vname) {
            vnodeData.name = node.vname;
        }
        return h(node.vtag, vnodeData, ...(node.vchildren || []));
    }
    const vnode = newVNode(node.vtag, node.vtext);
    vnode.$attrs$ = node.vattrs;
    vnode.$children$ = node.vchildren;
    vnode.$key$ = node.vkey;
    vnode.$name$ = node.vname;
    return vnode;
};
const initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
    const endHydrate = createTime('hydrateClient', tagName);
    const shadowRoot = hostElm.shadowRoot;
    const childRenderNodes = [];
    const slotNodes = [];
    const shadowRootNodes = shadowRoot ? [] : null;
    const vnode = (hostRef.$vnode$ = newVNode(tagName, null));
    if (!plt.$orgLocNodes$) {
        initializeDocumentHydrate(doc.body, (plt.$orgLocNodes$ = new Map()));
    }
    hostElm[HYDRATE_ID] = hostId;
    hostElm.removeAttribute(HYDRATE_ID);
    clientHydrate(vnode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, hostElm, hostId);
    childRenderNodes.map((c) => {
        const orgLocationId = c.$hostId$ + '.' + c.$nodeId$;
        const orgLocationNode = plt.$orgLocNodes$.get(orgLocationId);
        const node = c.$elm$;
        if (orgLocationNode && supportsShadow && orgLocationNode['s-en'] === '') {
            orgLocationNode.parentNode.insertBefore(node, orgLocationNode.nextSibling);
        }
        if (!shadowRoot) {
            node['s-hn'] = tagName;
            if (orgLocationNode) {
                node['s-ol'] = orgLocationNode;
                node['s-ol']['s-nr'] = node;
            }
        }
        plt.$orgLocNodes$.delete(orgLocationId);
    });
    if (shadowRoot) {
        shadowRootNodes.map((shadowRootNode) => {
            if (shadowRootNode) {
                shadowRoot.appendChild(shadowRootNode);
            }
        });
    }
    endHydrate();
};
const clientHydrate = (parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node, hostId) => {
    let childNodeType;
    let childIdSplt;
    let childVNode;
    let i;
    if (node.nodeType === 1 /* NODE_TYPE.ElementNode */) {
        childNodeType = node.getAttribute(HYDRATE_CHILD_ID);
        if (childNodeType) {
            // got the node data from the element's attribute
            // `${hostId}.${nodeId}.${depth}.${index}`
            childIdSplt = childNodeType.split('.');
            if (childIdSplt[0] === hostId || childIdSplt[0] === '0') {
                childVNode = {
                    $flags$: 0,
                    $hostId$: childIdSplt[0],
                    $nodeId$: childIdSplt[1],
                    $depth$: childIdSplt[2],
                    $index$: childIdSplt[3],
                    $tag$: node.tagName.toLowerCase(),
                    $elm$: node,
                    $attrs$: null,
                    $children$: null,
                    $key$: null,
                    $name$: null,
                    $text$: null,
                };
                childRenderNodes.push(childVNode);
                node.removeAttribute(HYDRATE_CHILD_ID);
                // this is a new child vnode
                // so ensure its parent vnode has the vchildren array
                if (!parentVNode.$children$) {
                    parentVNode.$children$ = [];
                }
                // add our child vnode to a specific index of the vnode's children
                parentVNode.$children$[childVNode.$index$] = childVNode;
                // this is now the new parent vnode for all the next child checks
                parentVNode = childVNode;
                if (shadowRootNodes && childVNode.$depth$ === '0') {
                    shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
                }
            }
        }
        // recursively drill down, end to start so we can remove nodes
        for (i = node.childNodes.length - 1; i >= 0; i--) {
            clientHydrate(parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node.childNodes[i], hostId);
        }
        if (node.shadowRoot) {
            // keep drilling down through the shadow root nodes
            for (i = node.shadowRoot.childNodes.length - 1; i >= 0; i--) {
                clientHydrate(parentVNode, childRenderNodes, slotNodes, shadowRootNodes, hostElm, node.shadowRoot.childNodes[i], hostId);
            }
        }
    }
    else if (node.nodeType === 8 /* NODE_TYPE.CommentNode */) {
        // `${COMMENT_TYPE}.${hostId}.${nodeId}.${depth}.${index}`
        childIdSplt = node.nodeValue.split('.');
        if (childIdSplt[1] === hostId || childIdSplt[1] === '0') {
            // comment node for either the host id or a 0 host id
            childNodeType = childIdSplt[0];
            childVNode = {
                $flags$: 0,
                $hostId$: childIdSplt[1],
                $nodeId$: childIdSplt[2],
                $depth$: childIdSplt[3],
                $index$: childIdSplt[4],
                $elm$: node,
                $attrs$: null,
                $children$: null,
                $key$: null,
                $name$: null,
                $tag$: null,
                $text$: null,
            };
            if (childNodeType === TEXT_NODE_ID) {
                childVNode.$elm$ = node.nextSibling;
                if (childVNode.$elm$ && childVNode.$elm$.nodeType === 3 /* NODE_TYPE.TextNode */) {
                    childVNode.$text$ = childVNode.$elm$.textContent;
                    childRenderNodes.push(childVNode);
                    // remove the text comment since it's no longer needed
                    node.remove();
                    if (!parentVNode.$children$) {
                        parentVNode.$children$ = [];
                    }
                    parentVNode.$children$[childVNode.$index$] = childVNode;
                    if (shadowRootNodes && childVNode.$depth$ === '0') {
                        shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
                    }
                }
            }
            else if (childVNode.$hostId$ === hostId) {
                // this comment node is specifcally for this host id
                if (childNodeType === SLOT_NODE_ID) {
                    // `${SLOT_NODE_ID}.${hostId}.${nodeId}.${depth}.${index}.${slotName}`;
                    childVNode.$tag$ = 'slot';
                    if (childIdSplt[5]) {
                        node['s-sn'] = childVNode.$name$ = childIdSplt[5];
                    }
                    else {
                        node['s-sn'] = '';
                    }
                    node['s-sr'] = true;
                    if (shadowRootNodes) {
                        // browser support shadowRoot and this is a shadow dom component
                        // create an actual slot element
                        childVNode.$elm$ = doc.createElement(childVNode.$tag$);
                        if (childVNode.$name$) {
                            // add the slot name attribute
                            childVNode.$elm$.setAttribute('name', childVNode.$name$);
                        }
                        // insert the new slot element before the slot comment
                        node.parentNode.insertBefore(childVNode.$elm$, node);
                        // remove the slot comment since it's not needed for shadow
                        node.remove();
                        if (childVNode.$depth$ === '0') {
                            shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
                        }
                    }
                    slotNodes.push(childVNode);
                    if (!parentVNode.$children$) {
                        parentVNode.$children$ = [];
                    }
                    parentVNode.$children$[childVNode.$index$] = childVNode;
                }
                else if (childNodeType === CONTENT_REF_ID) {
                    // `${CONTENT_REF_ID}.${hostId}`;
                    if (shadowRootNodes) {
                        // remove the content ref comment since it's not needed for shadow
                        node.remove();
                    }
                }
            }
        }
    }
    else if (parentVNode && parentVNode.$tag$ === 'style') {
        const vnode = newVNode(null, node.textContent);
        vnode.$elm$ = node;
        vnode.$index$ = '0';
        parentVNode.$children$ = [vnode];
    }
};
const initializeDocumentHydrate = (node, orgLocNodes) => {
    if (node.nodeType === 1 /* NODE_TYPE.ElementNode */) {
        let i = 0;
        for (; i < node.childNodes.length; i++) {
            initializeDocumentHydrate(node.childNodes[i], orgLocNodes);
        }
        if (node.shadowRoot) {
            for (i = 0; i < node.shadowRoot.childNodes.length; i++) {
                initializeDocumentHydrate(node.shadowRoot.childNodes[i], orgLocNodes);
            }
        }
    }
    else if (node.nodeType === 8 /* NODE_TYPE.CommentNode */) {
        const childIdSplt = node.nodeValue.split('.');
        if (childIdSplt[0] === ORG_LOCATION_ID) {
            orgLocNodes.set(childIdSplt[1] + '.' + childIdSplt[2], node);
            node.nodeValue = '';
            // useful to know if the original location is
            // the root light-dom of a shadow dom component
            node['s-en'] = childIdSplt[3];
        }
    }
};
/**
 * Parse a new property value for a given property type.
 *
 * While the prop value can reasonably be expected to be of `any` type as far as TypeScript's type checker is concerned,
 * it is not safe to assume that the string returned by evaluating `typeof propValue` matches:
 *   1. `any`, the type given to `propValue` in the function signature
 *   2. the type stored from `propType`.
 *
 * This function provides the capability to parse/coerce a property's value to potentially any other JavaScript type.
 *
 * Property values represented in TSX preserve their type information. In the example below, the number 0 is passed to
 * a component. This `propValue` will preserve its type information (`typeof propValue === 'number'`). Note that is
 * based on the type of the value being passed in, not the type declared of the class member decorated with `@Prop`.
 * ```tsx
 * <my-cmp prop-val={0}></my-cmp>
 * ```
 *
 * HTML prop values on the other hand, will always a string
 *
 * @param propValue the new value to coerce to some type
 * @param propType the type of the prop, expressed as a binary number
 * @returns the parsed/coerced value
 */
const parsePropertyValue = (propValue, propType) => {
    // ensure this value is of the correct prop type
    if (propValue != null && !isComplexType(propValue)) {
        if (propType & 4 /* MEMBER_FLAGS.Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return propValue === 'false' ? false : propValue === '' || !!propValue;
        }
        if (propType & 2 /* MEMBER_FLAGS.Number */) {
            // force it to be a number
            return parseFloat(propValue);
        }
        if (propType & 1 /* MEMBER_FLAGS.String */) {
            // could have been passed as a number or boolean
            // but we still want it as a string
            return String(propValue);
        }
        // redundant return here for better minification
        return propValue;
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
};
const getElement = (ref) => (getHostRef(ref).$hostElement$ );
const createEvent = (ref, name, flags) => {
    const elm = getElement(ref);
    return {
        emit: (detail) => {
            return emitEvent(elm, name, {
                bubbles: !!(flags & 4 /* EVENT_FLAGS.Bubbles */),
                composed: !!(flags & 2 /* EVENT_FLAGS.Composed */),
                cancelable: !!(flags & 1 /* EVENT_FLAGS.Cancellable */),
                detail,
            });
        },
    };
};
/**
 * Helper function to create & dispatch a custom Event on a provided target
 * @param elm the target of the Event
 * @param name the name to give the custom Event
 * @param opts options for configuring a custom Event
 * @returns the custom Event
 */
const emitEvent = (elm, name, opts) => {
    const ev = plt.ce(name, opts);
    elm.dispatchEvent(ev);
    return ev;
};
const rootAppliedStyles = /*@__PURE__*/ new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
    let style = styles.get(scopeId);
    if (supportsConstructableStylesheets && allowCS) {
        style = (style || new CSSStyleSheet());
        if (typeof style === 'string') {
            style = cssText;
        }
        else {
            style.replaceSync(cssText);
        }
    }
    else {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
    let scopeId = getScopeId(cmpMeta);
    const style = styles.get(scopeId);
    // if an element is NOT connected then getRootNode() will return the wrong root node
    // so the fallback is to always use the document for the root node in those cases
    styleContainerNode = styleContainerNode.nodeType === 11 /* NODE_TYPE.DocumentFragment */ ? styleContainerNode : doc;
    if (style) {
        if (typeof style === 'string') {
            styleContainerNode = styleContainerNode.head || styleContainerNode;
            let appliedStyles = rootAppliedStyles.get(styleContainerNode);
            let styleElm;
            if (!appliedStyles) {
                rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
            }
            if (!appliedStyles.has(scopeId)) {
                if (styleContainerNode.host &&
                    (styleElm = styleContainerNode.querySelector(`[${HYDRATED_STYLE_ID}="${scopeId}"]`))) {
                    // This is only happening on native shadow-dom, do not needs CSS var shim
                    styleElm.innerHTML = style;
                }
                else {
                    {
                        styleElm = doc.createElement('style');
                        styleElm.innerHTML = style;
                    }
                    styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
        }
    }
    return scopeId;
};
const attachStyles = (hostRef) => {
    const cmpMeta = hostRef.$cmpMeta$;
    const elm = hostRef.$hostElement$;
    const flags = cmpMeta.$flags$;
    const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
    const scopeId = addStyle(elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta);
    if (flags & 10 /* CMP_FLAGS.needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = scopeId;
        elm.classList.add(scopeId + '-h');
    }
    endAttachStyles();
};
const getScopeId = (cmp, mode) => 'sc-' + (cmp.$tagName$);
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
    if (oldValue !== newValue) {
        let isProp = isMemberInElement(elm, memberName);
        let ln = memberName.toLowerCase();
        if (memberName === 'class') {
            const classList = elm.classList;
            const oldClasses = parseClassList(oldValue);
            const newClasses = parseClassList(newValue);
            classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)));
            classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
        }
        else if (memberName === 'style') {
            // update style attribute, css properties and values
            {
                for (const prop in oldValue) {
                    if (!newValue || newValue[prop] == null) {
                        if (prop.includes('-')) {
                            elm.style.removeProperty(prop);
                        }
                        else {
                            elm.style[prop] = '';
                        }
                    }
                }
            }
            for (const prop in newValue) {
                if (!oldValue || newValue[prop] !== oldValue[prop]) {
                    if (prop.includes('-')) {
                        elm.style.setProperty(prop, newValue[prop]);
                    }
                    else {
                        elm.style[prop] = newValue[prop];
                    }
                }
            }
        }
        else if (memberName === 'key')
            ;
        else if (memberName === 'ref') {
            // minifier will clean this up
            if (newValue) {
                newValue(elm);
            }
        }
        else if ((!isProp ) &&
            memberName[0] === 'o' &&
            memberName[1] === 'n') {
            // Event Handlers
            // so if the member name starts with "on" and the 3rd characters is
            // a capital letter, and it's not already a member on the element,
            // then we're assuming it's an event listener
            if (memberName[2] === '-') {
                // on- prefixed events
                // allows to be explicit about the dom event to listen without any magic
                // under the hood:
                // <my-cmp on-click> // listens for "click"
                // <my-cmp on-Click> // listens for "Click"
                // <my-cmp on-ionChange> // listens for "ionChange"
                // <my-cmp on-EVENTS> // listens for "EVENTS"
                memberName = memberName.slice(3);
            }
            else if (isMemberInElement(win, ln)) {
                // standard event
                // the JSX attribute could have been "onMouseOver" and the
                // member name "onmouseover" is on the window's prototype
                // so let's add the listener "mouseover", which is all lowercased
                memberName = ln.slice(2);
            }
            else {
                // custom event
                // the JSX attribute could have been "onMyCustomEvent"
                // so let's trim off the "on" prefix and lowercase the first character
                // and add the listener "myCustomEvent"
                // except for the first character, we keep the event name case
                memberName = ln[2] + memberName.slice(3);
            }
            if (oldValue) {
                plt.rel(elm, memberName, oldValue, false);
            }
            if (newValue) {
                plt.ael(elm, memberName, newValue, false);
            }
        }
        else {
            // Set property if it exists and it's not a SVG
            const isComplex = isComplexType(newValue);
            if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                try {
                    if (!elm.tagName.includes('-')) {
                        const n = newValue == null ? '' : newValue;
                        // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                        if (memberName === 'list') {
                            isProp = false;
                        }
                        else if (oldValue == null || elm[memberName] != n) {
                            elm[memberName] = n;
                        }
                    }
                    else {
                        elm[memberName] = newValue;
                    }
                }
                catch (e) { }
            }
            /**
             * Need to manually update attribute if:
             * - memberName is not an attribute
             * - if we are rendering the host element in order to reflect attribute
             * - if it's a SVG, since properties might not work in <svg>
             * - if the newValue is null/undefined or 'false'.
             */
            let xlink = false;
            {
                if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
                    memberName = ln;
                    xlink = true;
                }
            }
            if (newValue == null || newValue === false) {
                if (newValue !== false || elm.getAttribute(memberName) === '') {
                    if (xlink) {
                        elm.removeAttributeNS(XLINK_NS, memberName);
                    }
                    else {
                        elm.removeAttribute(memberName);
                    }
                }
            }
            else if ((!isProp || flags & 4 /* VNODE_FLAGS.isHost */ || isSvg) && !isComplex) {
                newValue = newValue === true ? '' : newValue;
                if (xlink) {
                    elm.setAttributeNS(XLINK_NS, memberName, newValue);
                }
                else {
                    elm.setAttribute(memberName, newValue);
                }
            }
        }
    }
};
const parseClassListRegex = /\s/;
const parseClassList = (value) => (!value ? [] : value.split(parseClassListRegex));
const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const elm = newVnode.$elm$.nodeType === 11 /* NODE_TYPE.DocumentFragment */ && newVnode.$elm$.host
        ? newVnode.$elm$.host
        : newVnode.$elm$;
    const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
    const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
    {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
            if (!(memberName in newVnodeAttrs)) {
                setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
            }
        }
    }
    // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
    }
};
/**
 * Create a DOM Node corresponding to one of the children of a given VNode.
 *
 * @param oldParentVNode the parent VNode from the previous render
 * @param newParentVNode the parent VNode from the current render
 * @param childIndex the index of the VNode, in the _new_ parent node's
 * children, for which we will create a new DOM node
 * @param parentElm the parent DOM node which our new node will be a child of
 * @returns the newly created node
 */
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
    // tslint:disable-next-line: prefer-const
    const newVNode = newParentVNode.$children$[childIndex];
    let i = 0;
    let elm;
    let childNode;
    if (newVNode.$text$ !== null) {
        // create text node
        elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
    }
    else {
        if (!isSvgMode) {
            isSvgMode = newVNode.$tag$ === 'svg';
        }
        // create element
        elm = newVNode.$elm$ = (doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, newVNode.$tag$)
            );
        if (isSvgMode && newVNode.$tag$ === 'foreignObject') {
            isSvgMode = false;
        }
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if (isDef(scopeId) && elm['s-si'] !== scopeId) {
            // if there is a scopeId and this is the initial render
            // then let's add the scopeId as a css class
            elm.classList.add((elm['s-si'] = scopeId));
        }
        if (newVNode.$children$) {
            for (i = 0; i < newVNode.$children$.length; ++i) {
                // create the node
                childNode = createElm(oldParentVNode, newVNode, i);
                // return node could have been null
                if (childNode) {
                    // append our new node
                    elm.appendChild(childNode);
                }
            }
        }
        {
            if (newVNode.$tag$ === 'svg') {
                // Only reset the SVG context when we're exiting <svg> element
                isSvgMode = false;
            }
            else if (elm.tagName === 'foreignObject') {
                // Reenter SVG context when we're exiting <foreignObject> element
                isSvgMode = true;
            }
        }
    }
    return elm;
};
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
    let containerElm = (parentElm);
    let childNode;
    if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode, before);
            }
        }
    }
};
const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
    for (; startIdx <= endIdx; ++startIdx) {
        if ((vnode = vnodes[startIdx])) {
            elm = vnode.$elm$;
            callNodeRefs(vnode);
            // remove the vnode's element from the dom
            elm.remove();
        }
    }
};
/**
 * Reconcile the children of a new VNode with the children of an old VNode by
 * traversing the two collections of children, identifying nodes that are
 * conserved or changed, calling out to `patch` to make any necessary
 * updates to the DOM, and rearranging DOM nodes as needed.
 *
 * The algorithm for reconciling children works by analyzing two 'windows' onto
 * the two arrays of children (`oldCh` and `newCh`). We keep track of the
 * 'windows' by storing start and end indices and references to the
 * corresponding array entries. Initially the two 'windows' are basically equal
 * to the entire array, but we progressively narrow the windows until there are
 * no children left to update by doing the following:
 *
 * 1. Skip any `null` entries at the beginning or end of the two arrays, so
 *    that if we have an initial array like the following we'll end up dealing
 *    only with a window bounded by the highlighted elements:
 *
 *    [null, null, VNode1 , ... , VNode2, null, null]
 *                 ^^^^^^         ^^^^^^
 *
 * 2. Check to see if the elements at the head and tail positions are equal
 *    across the windows. This will basically detect elements which haven't
 *    been added, removed, or changed position, i.e. if you had the following
 *    VNode elements (represented as HTML):
 *
 *    oldVNode: `<div><p><span>HEY</span></p></div>`
 *    newVNode: `<div><p><span>THERE</span></p></div>`
 *
 *    Then when comparing the children of the `<div>` tag we check the equality
 *    of the VNodes corresponding to the `<p>` tags and, since they are the
 *    same tag in the same position, we'd be able to avoid completely
 *    re-rendering the subtree under them with a new DOM element and would just
 *    call out to `patch` to handle reconciling their children and so on.
 *
 * 3. Check, for both windows, to see if the element at the beginning of the
 *    window corresponds to the element at the end of the other window. This is
 *    a heuristic which will let us identify _some_ situations in which
 *    elements have changed position, for instance it _should_ detect that the
 *    children nodes themselves have not changed but merely moved in the
 *    following example:
 *
 *    oldVNode: `<div><element-one /><element-two /></div>`
 *    newVNode: `<div><element-two /><element-one /></div>`
 *
 *    If we find cases like this then we also need to move the concrete DOM
 *    elements corresponding to the moved children to write the re-order to the
 *    DOM.
 *
 * 4. Finally, if VNodes have the `key` attribute set on them we check for any
 *    nodes in the old children which have the same key as the first element in
 *    our window on the new children. If we find such a node we handle calling
 *    out to `patch`, moving relevant DOM nodes, and so on, in accordance with
 *    what we find.
 *
 * Finally, once we've narrowed our 'windows' to the point that either of them
 * collapse (i.e. they have length 0) we then handle any remaining VNode
 * insertion or deletion that needs to happen to get a DOM state that correctly
 * reflects the new child VNodes. If, for instance, after our window on the old
 * children has collapsed we still have more nodes on the new children that
 * we haven't dealt with yet then we need to add them, or if the new children
 * collapse but we still have unhandled _old_ children then we need to make
 * sure the corresponding DOM nodes are removed.
 *
 * @param parentElm the node into which the parent VNode is rendered
 * @param oldCh the old children of the parent node
 * @param newVNode the new VNode which will replace the parent
 * @param newCh the new children of the parent node
 */
const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let idxInOld = 0;
    let i = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let node;
    let elmToMove;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            // VNode might have been moved left
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            // if the start nodes are the same then we should patch the new VNode
            // onto the old one, and increment our `newStartIdx` and `oldStartIdx`
            // indices to reflect that. We don't need to move any DOM Nodes around
            // since things are matched up in order.
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            // likewise, if the end nodes are the same we patch new onto old and
            // decrement our end indices, and also likewise in this case we don't
            // need to move any DOM Nodes.
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode);
            // We need to move the element for `oldStartVnode` into a position which
            // will be appropriate for `newEndVnode`. For this we can use
            // `.insertBefore` and `oldEndVnode.$elm$.nextSibling`. If there is a
            // sibling for `oldEndVnode.$elm$` then we want to move the DOM node for
            // `oldStartVnode` between `oldEndVnode` and it's sibling, like so:
            //
            // <old-start-node />
            // <some-intervening-node />
            // <old-end-node />
            // <!-- ->              <-- `oldStartVnode.$elm$` should be inserted here
            // <next-sibling />
            //
            // If instead `oldEndVnode.$elm$` has no sibling then we just want to put
            // the node for `oldStartVnode` at the end of the children of
            // `parentElm`. Luckily, `Node.nextSibling` will return `null` if there
            // aren't any siblings, and passing `null` to `Node.insertBefore` will
            // append it to the children of the parent element.
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode);
            // We've already checked above if `oldStartVnode` and `newStartVnode` are
            // the same node, so since we're here we know that they are not. Thus we
            // can move the element for `oldEndVnode` _before_ the element for
            // `oldStartVnode`, leaving `oldStartVnode` to be reconciled in the
            // future.
            parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            // Here we do some checks to match up old and new nodes based on the
            // `$key$` attribute, which is set by putting a `key="my-key"` attribute
            // in the JSX for a DOM element in the implementation of a Stencil
            // component.
            //
            // First we check to see if there are any nodes in the array of old
            // children which have the same key as the first node in the new
            // children.
            idxInOld = -1;
            {
                for (i = oldStartIdx; i <= oldEndIdx; ++i) {
                    if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
                        idxInOld = i;
                        break;
                    }
                }
            }
            if (idxInOld >= 0) {
                // We found a node in the old children which matches up with the first
                // node in the new children! So let's deal with that
                elmToMove = oldCh[idxInOld];
                if (elmToMove.$tag$ !== newStartVnode.$tag$) {
                    // the tag doesn't match so we'll need a new DOM element
                    node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld);
                }
                else {
                    patch(elmToMove, newStartVnode);
                    // invalidate the matching old node so that we won't try to update it
                    // again later on
                    oldCh[idxInOld] = undefined;
                    node = elmToMove.$elm$;
                }
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                // We either didn't find an element in the old children that matches
                // the key of the first new child OR the build is not using `key`
                // attributes at all. In either case we need to create a new element
                // for the new node.
                node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx);
                newStartVnode = newCh[++newStartIdx];
            }
            if (node) {
                // if we created a new node then handle inserting it to the DOM
                {
                    oldStartVnode.$elm$.parentNode.insertBefore(node, oldStartVnode.$elm$);
                }
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        // we have some more new nodes to add which don't match up with old nodes
        addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
    }
    else if (newStartIdx > newEndIdx) {
        // there are nodes in the `oldCh` array which no longer correspond to nodes
        // in the new array, so lets remove them (which entails cleaning up the
        // relevant DOM nodes)
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
/**
 * Compare two VNodes to determine if they are the same
 *
 * **NB**: This function is an equality _heuristic_ based on the available
 * information set on the two VNodes and can be misleading under certain
 * circumstances. In particular, if the two nodes do not have `key` attrs
 * (available under `$key$` on VNodes) then the function falls back on merely
 * checking that they have the same tag.
 *
 * So, in other words, if `key` attrs are not set on VNodes which may be
 * changing order within a `children` array or something along those lines then
 * we could obtain a false positive and then have to do needless re-rendering.
 *
 * @param leftVNode the first VNode to check
 * @param rightVNode the second VNode to check
 * @returns whether they're equal or not
 */
const isSameVnode = (leftVNode, rightVNode) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (leftVNode.$tag$ === rightVNode.$tag$) {
        // this will be set if components in the build have `key` attrs set on them
        {
            return leftVNode.$key$ === rightVNode.$key$;
        }
    }
    return false;
};
/**
 * Handle reconciling an outdated VNode with a new one which corresponds to
 * it. This function handles flushing updates to the DOM and reconciling the
 * children of the two nodes (if any).
 *
 * @param oldVNode an old VNode whose DOM element and children we want to update
 * @param newVNode a new VNode representing an updated version of the old one
 */
const patch = (oldVNode, newVNode) => {
    const elm = (newVNode.$elm$ = oldVNode.$elm$);
    const oldChildren = oldVNode.$children$;
    const newChildren = newVNode.$children$;
    const tag = newVNode.$tag$;
    const text = newVNode.$text$;
    if (text === null) {
        {
            // test if we're rendering an svg element, or still rendering nodes inside of one
            // only add this to the when the compiler sees we're using an svg somewhere
            isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode;
        }
        {
            if (tag === 'slot')
                ;
            else {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if (oldChildren !== null && newChildren !== null) {
            // looks like there's child vnodes for both the old and new vnodes
            // so we need to call `updateChildren` to reconcile them
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (newChildren !== null) {
            // no old child vnodes, but there are new child vnodes to add
            if (oldVNode.$text$ !== null) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if (oldChildren !== null) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
        if (isSvgMode && tag === 'svg') {
            isSvgMode = false;
        }
    }
    else if (oldVNode.$text$ !== text) {
        // update the text content for the text only vnode
        // and also only if the text is different than before
        elm.data = text;
    }
};
const callNodeRefs = (vNode) => {
    {
        vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
        vNode.$children$ && vNode.$children$.map(callNodeRefs);
    }
};
const renderVdom = (hostRef, renderFnResults) => {
    const hostElm = hostRef.$hostElement$;
    const cmpMeta = hostRef.$cmpMeta$;
    const oldVNode = hostRef.$vnode$ || newVNode(null, null);
    const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
    hostTagName = hostElm.tagName;
    if (cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]));
    }
    rootVnode.$tag$ = null;
    rootVnode.$flags$ |= 4 /* VNODE_FLAGS.isHost */;
    hostRef.$vnode$ = rootVnode;
    rootVnode.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm );
    {
        scopeId = hostElm['s-sc'];
    }
    // synchronous patch
    patch(oldVNode, rootVnode);
};
const attachToAncestor = (hostRef, ancestorComponent) => {
    if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
        ancestorComponent['s-p'].push(new Promise((r) => (hostRef.$onRenderResolve$ = r)));
    }
};
const scheduleUpdate = (hostRef, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* HOST_FLAGS.isQueuedForUpdate */;
    }
    if (hostRef.$flags$ & 4 /* HOST_FLAGS.isWaitingForChildren */) {
        hostRef.$flags$ |= 512 /* HOST_FLAGS.needsRerender */;
        return;
    }
    attachToAncestor(hostRef, hostRef.$ancestorComponent$);
    // there is no ancestor component or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
    return writeTask(dispatch) ;
};
const dispatchHooks = (hostRef, isInitialLoad) => {
    const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
    const instance = hostRef.$lazyInstance$ ;
    let promise;
    if (isInitialLoad) {
        {
            hostRef.$flags$ |= 256 /* HOST_FLAGS.isListenReady */;
            if (hostRef.$queuedListeners$) {
                hostRef.$queuedListeners$.map(([methodName, event]) => safeCall(instance, methodName, event));
                hostRef.$queuedListeners$ = null;
            }
        }
        {
            promise = safeCall(instance, 'componentWillLoad');
        }
    }
    endSchedule();
    return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
};
const updateComponent = async (hostRef, instance, isInitialLoad) => {
    // updateComponent
    const elm = hostRef.$hostElement$;
    const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
    const rc = elm['s-rc'];
    if (isInitialLoad) {
        // DOM WRITE!
        attachStyles(hostRef);
    }
    const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
    {
        callRender(hostRef, instance);
    }
    if (rc) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        rc.map((cb) => cb());
        elm['s-rc'] = undefined;
    }
    endRender();
    endUpdate();
    {
        const childrenPromises = elm['s-p'];
        const postUpdate = () => postUpdateComponent(hostRef);
        if (childrenPromises.length === 0) {
            postUpdate();
        }
        else {
            Promise.all(childrenPromises).then(postUpdate);
            hostRef.$flags$ |= 4 /* HOST_FLAGS.isWaitingForChildren */;
            childrenPromises.length = 0;
        }
    }
};
const callRender = (hostRef, instance, elm) => {
    try {
        instance = instance.render() ;
        {
            hostRef.$flags$ &= ~16 /* HOST_FLAGS.isQueuedForUpdate */;
        }
        {
            hostRef.$flags$ |= 2 /* HOST_FLAGS.hasRendered */;
        }
        {
            {
                // looks like we've got child nodes to render into this host element
                // or we need to update the css class/attrs on the host element
                // DOM WRITE!
                {
                    renderVdom(hostRef, instance);
                }
            }
        }
    }
    catch (e) {
        consoleError(e, hostRef.$hostElement$);
    }
    return null;
};
const postUpdateComponent = (hostRef) => {
    const tagName = hostRef.$cmpMeta$.$tagName$;
    const elm = hostRef.$hostElement$;
    const endPostUpdate = createTime('postUpdate', tagName);
    const instance = hostRef.$lazyInstance$ ;
    const ancestorComponent = hostRef.$ancestorComponent$;
    if (!(hostRef.$flags$ & 64 /* HOST_FLAGS.hasLoadedComponent */)) {
        hostRef.$flags$ |= 64 /* HOST_FLAGS.hasLoadedComponent */;
        {
            // DOM WRITE!
            addHydratedFlag(elm);
        }
        {
            safeCall(instance, 'componentDidLoad');
        }
        endPostUpdate();
        {
            hostRef.$onReadyResolve$(elm);
            if (!ancestorComponent) {
                appDidLoad();
            }
        }
    }
    else {
        endPostUpdate();
    }
    {
        hostRef.$onInstanceResolve$(elm);
    }
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    {
        if (hostRef.$onRenderResolve$) {
            hostRef.$onRenderResolve$();
            hostRef.$onRenderResolve$ = undefined;
        }
        if (hostRef.$flags$ & 512 /* HOST_FLAGS.needsRerender */) {
            nextTick(() => scheduleUpdate(hostRef, false));
        }
        hostRef.$flags$ &= ~(4 /* HOST_FLAGS.isWaitingForChildren */ | 512 /* HOST_FLAGS.needsRerender */);
    }
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
};
const appDidLoad = (who) => {
    // on appload
    // we have finish the first big initial render
    {
        addHydratedFlag(doc.documentElement);
    }
    nextTick(() => emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } }));
};
const safeCall = (instance, method, arg) => {
    if (instance && instance[method]) {
        try {
            return instance[method](arg);
        }
        catch (e) {
            consoleError(e);
        }
    }
    return undefined;
};
const then = (promise, thenFn) => {
    return promise && promise.then ? promise.then(thenFn) : thenFn();
};
const addHydratedFlag = (elm) => elm.classList.add('hydrated')
    ;
const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
    // check our new property value against our internal value
    const hostRef = getHostRef(ref);
    const elm = hostRef.$hostElement$ ;
    const oldVal = hostRef.$instanceValues$.get(propName);
    const flags = hostRef.$flags$;
    const instance = hostRef.$lazyInstance$ ;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    // explicitly check for NaN on both sides, as `NaN === NaN` is always false
    const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
    const didValueChange = newVal !== oldVal && !areBothNaN;
    if ((!(flags & 8 /* HOST_FLAGS.isConstructingInstance */) || oldVal === undefined) && didValueChange) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if (instance) {
            // get an array of method names of watch functions to call
            if (cmpMeta.$watchers$ && flags & 128 /* HOST_FLAGS.isWatchReady */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.map((watchMethodName) => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            instance[watchMethodName](newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e, elm);
                        }
                    });
                }
            }
            if ((flags & (2 /* HOST_FLAGS.hasRendered */ | 16 /* HOST_FLAGS.isQueuedForUpdate */)) === 2 /* HOST_FLAGS.hasRendered */) {
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(hostRef, false);
            }
        }
    }
};
/**
 * Attach a series of runtime constructs to a compiled Stencil component
 * constructor, including getters and setters for the `@Prop` and `@State`
 * decorators, callbacks for when attributes change, and so on.
 *
 * @param Cstr the constructor for a component that we need to process
 * @param cmpMeta metadata collected previously about the component
 * @param flags a number used to store a series of bit flags
 * @returns a reference to the same constructor passed in (but now mutated)
 */
const proxyComponent = (Cstr, cmpMeta, flags) => {
    if (cmpMeta.$members$) {
        if (Cstr.watchers) {
            cmpMeta.$watchers$ = Cstr.watchers;
        }
        // It's better to have a const than two Object.entries()
        const members = Object.entries(cmpMeta.$members$);
        const prototype = Cstr.prototype;
        members.map(([memberName, [memberFlags]]) => {
            if ((memberFlags & 31 /* MEMBER_FLAGS.Prop */ ||
                    ((flags & 2 /* PROXY_FLAGS.proxyState */) && memberFlags & 32 /* MEMBER_FLAGS.State */))) {
                // proxyComponent - prop
                Object.defineProperty(prototype, memberName, {
                    get() {
                        // proxyComponent, get value
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        // proxyComponent, set value
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true,
                });
            }
            else if (flags & 1 /* PROXY_FLAGS.isElementConstructor */ &&
                memberFlags & 64 /* MEMBER_FLAGS.Method */) {
                // proxyComponent - method
                Object.defineProperty(prototype, memberName, {
                    value(...args) {
                        const ref = getHostRef(this);
                        return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args));
                    },
                });
            }
        });
        if ((flags & 1 /* PROXY_FLAGS.isElementConstructor */)) {
            const attrNameToPropName = new Map();
            prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                plt.jmp(() => {
                    const propName = attrNameToPropName.get(attrName);
                    //  In a web component lifecycle the attributeChangedCallback runs prior to connectedCallback
                    //  in the case where an attribute was set inline.
                    //  ```html
                    //    <my-component some-attribute="some-value"></my-component>
                    //  ```
                    //
                    //  There is an edge case where a developer sets the attribute inline on a custom element and then
                    //  programmatically changes it before it has been upgraded as shown below:
                    //
                    //  ```html
                    //    <!-- this component has _not_ been upgraded yet -->
                    //    <my-component id="test" some-attribute="some-value"></my-component>
                    //    <script>
                    //      // grab non-upgraded component
                    //      el = document.querySelector("#test");
                    //      el.someAttribute = "another-value";
                    //      // upgrade component
                    //      customElements.define('my-component', MyComponent);
                    //    </script>
                    //  ```
                    //  In this case if we do not unshadow here and use the value of the shadowing property, attributeChangedCallback
                    //  will be called with `newValue = "some-value"` and will set the shadowed property (this.someAttribute = "another-value")
                    //  to the value that was set inline i.e. "some-value" from above example. When
                    //  the connectedCallback attempts to unshadow it will use "some-value" as the initial value rather than "another-value"
                    //
                    //  The case where the attribute was NOT set inline but was not set programmatically shall be handled/unshadowed
                    //  by connectedCallback as this attributeChangedCallback will not fire.
                    //
                    //  https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
                    //
                    //  TODO(STENCIL-16) we should think about whether or not we actually want to be reflecting the attributes to
                    //  properties here given that this goes against best practices outlined here
                    //  https://developers.google.com/web/fundamentals/web-components/best-practices#avoid-reentrancy
                    if (this.hasOwnProperty(propName)) {
                        newValue = this[propName];
                        delete this[propName];
                    }
                    else if (prototype.hasOwnProperty(propName) &&
                        typeof this[propName] === 'number' &&
                        this[propName] == newValue) {
                        // if the propName exists on the prototype of `Cstr`, this update may be a result of Stencil using native
                        // APIs to reflect props as attributes. Calls to `setAttribute(someElement, propName)` will result in
                        // `propName` to be converted to a `DOMString`, which may not be what we want for other primitive props.
                        return;
                    }
                    this[propName] = newValue === null && typeof this[propName] === 'boolean' ? false : newValue;
                });
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(([_, m]) => m[0] & 15 /* MEMBER_FLAGS.HasAttribute */) // filter to only keep props that should match attributes
                .map(([propName, m]) => {
                const attrName = m[1] || propName;
                attrNameToPropName.set(attrName, propName);
                if (m[0] & 512 /* MEMBER_FLAGS.ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
    // initializeComponent
    if ((hostRef.$flags$ & 32 /* HOST_FLAGS.hasInitializedComponent */) === 0) {
        {
            // we haven't initialized this element yet
            hostRef.$flags$ |= 32 /* HOST_FLAGS.hasInitializedComponent */;
            // lazy loaded components
            // request the component's implementation to be
            // wired up with the host element
            Cstr = loadModule(cmpMeta);
            if (Cstr.then) {
                // Await creates a micro-task avoid if possible
                const endLoad = uniqueTime();
                Cstr = await Cstr;
                endLoad();
            }
            if (!Cstr.isProxied) {
                // we've never proxied this Constructor before
                // let's add the getters/setters to its prototype before
                // the first time we create an instance of the implementation
                {
                    cmpMeta.$watchers$ = Cstr.watchers;
                }
                proxyComponent(Cstr, cmpMeta, 2 /* PROXY_FLAGS.proxyState */);
                Cstr.isProxied = true;
            }
            const endNewInstance = createTime('createInstance', cmpMeta.$tagName$);
            // ok, time to construct the instance
            // but let's keep track of when we start and stop
            // so that the getters/setters don't incorrectly step on data
            {
                hostRef.$flags$ |= 8 /* HOST_FLAGS.isConstructingInstance */;
            }
            // construct the lazy-loaded component implementation
            // passing the hostRef is very important during
            // construction in order to directly wire together the
            // host element and the lazy-loaded instance
            try {
                new Cstr(hostRef);
            }
            catch (e) {
                consoleError(e);
            }
            {
                hostRef.$flags$ &= ~8 /* HOST_FLAGS.isConstructingInstance */;
            }
            {
                hostRef.$flags$ |= 128 /* HOST_FLAGS.isWatchReady */;
            }
            endNewInstance();
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        if (Cstr.style) {
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            const scopeId = getScopeId(cmpMeta);
            if (!styles.has(scopeId)) {
                const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
                registerStyle(scopeId, style, !!(cmpMeta.$flags$ & 1 /* CMP_FLAGS.shadowDomEncapsulation */));
                endRegisterStyles();
            }
        }
    }
    // we've successfully created a lazy instance
    const ancestorComponent = hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(hostRef, true);
    if (ancestorComponent && ancestorComponent['s-rc']) {
        // this is the initial load and this component it has an ancestor component
        // but the ancestor component has NOT fired its will update lifecycle yet
        // so let's just cool our jets and wait for the ancestor to continue first
        // this will get fired off when the ancestor component
        // finally gets around to rendering its lazy self
        // fire off the initial update
        ancestorComponent['s-rc'].push(schedule);
    }
    else {
        schedule();
    }
};
const fireConnectedCallback = (instance) => {
    {
        safeCall(instance, 'connectedCallback');
    }
};
const connectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* PLATFORM_FLAGS.isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        const cmpMeta = hostRef.$cmpMeta$;
        const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
        if (!(hostRef.$flags$ & 1 /* HOST_FLAGS.hasConnected */)) {
            // first time this component has connected
            hostRef.$flags$ |= 1 /* HOST_FLAGS.hasConnected */;
            let hostId;
            {
                hostId = elm.getAttribute(HYDRATE_ID);
                if (hostId) {
                    if (cmpMeta.$flags$ & 1 /* CMP_FLAGS.shadowDomEncapsulation */) {
                        const scopeId = addStyle(elm.shadowRoot, cmpMeta);
                        elm.classList.remove(scopeId + '-h', scopeId + '-s');
                    }
                    initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
                }
            }
            {
                // find the first ancestor component (if there is one) and register
                // this component as one of the actively loading child components for its ancestor
                let ancestorComponent = elm;
                while ((ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host)) {
                    // climb up the ancestors looking for the first
                    // component that hasn't finished its lifecycle update yet
                    if ((ancestorComponent.nodeType === 1 /* NODE_TYPE.ElementNode */ &&
                        ancestorComponent.hasAttribute('s-id') &&
                        ancestorComponent['s-p']) ||
                        ancestorComponent['s-p']) {
                        // we found this components first ancestor component
                        // keep a reference to this component's ancestor component
                        attachToAncestor(hostRef, (hostRef.$ancestorComponent$ = ancestorComponent));
                        break;
                    }
                }
            }
            // Lazy properties
            // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            if (cmpMeta.$members$) {
                Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
                    if (memberFlags & 31 /* MEMBER_FLAGS.Prop */ && elm.hasOwnProperty(memberName)) {
                        const value = elm[memberName];
                        delete elm[memberName];
                        elm[memberName] = value;
                    }
                });
            }
            {
                initializeComponent(elm, hostRef, cmpMeta);
            }
        }
        else {
            // not the first time this has connected
            // reattach any event listeners to the host
            // since they would have been removed when disconnected
            addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
            // fire off connectedCallback() on component instance
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        endConnected();
    }
};
const disconnectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* PLATFORM_FLAGS.isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        const instance = hostRef.$lazyInstance$ ;
        {
            if (hostRef.$rmListeners$) {
                hostRef.$rmListeners$.map((rmListener) => rmListener());
                hostRef.$rmListeners$ = undefined;
            }
        }
        {
            safeCall(instance, 'disconnectedCallback');
        }
    }
};
const proxyCustomElement = (Cstr, compactMeta) => {
    const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1],
    };
    {
        cmpMeta.$members$ = compactMeta[2];
    }
    {
        cmpMeta.$listeners$ = compactMeta[3];
    }
    {
        cmpMeta.$watchers$ = Cstr.$watchers$;
    }
    {
        cmpMeta.$attrsToReflect$ = [];
    }
    const originalConnectedCallback = Cstr.prototype.connectedCallback;
    const originalDisconnectedCallback = Cstr.prototype.disconnectedCallback;
    Object.assign(Cstr.prototype, {
        __registerHost() {
            registerHost(this, cmpMeta);
        },
        connectedCallback() {
            connectedCallback(this);
            if (originalConnectedCallback) {
                originalConnectedCallback.call(this);
            }
        },
        disconnectedCallback() {
            disconnectedCallback(this);
            if (originalDisconnectedCallback) {
                originalDisconnectedCallback.call(this);
            }
        },
        __attachShadow() {
            {
                {
                    this.attachShadow({ mode: 'open' });
                }
            }
        },
    });
    Cstr.is = cmpMeta.$tagName$;
    return proxyComponent(Cstr, cmpMeta, 1 /* PROXY_FLAGS.isElementConstructor */ | 2 /* PROXY_FLAGS.proxyState */);
};
const addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
    if (listeners) {
        listeners.map(([flags, name, method]) => {
            const target = getHostListenerTarget(elm, flags) ;
            const handler = hostListenerProxy(hostRef, method);
            const opts = hostListenerOpts(flags);
            plt.ael(target, name, handler, opts);
            (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
        });
    }
};
const hostListenerProxy = (hostRef, methodName) => (ev) => {
    try {
        {
            if (hostRef.$flags$ & 256 /* HOST_FLAGS.isListenReady */) {
                // instance is ready, let's call it's member method for this event
                hostRef.$lazyInstance$[methodName](ev);
            }
            else {
                (hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([methodName, ev]);
            }
        }
    }
    catch (e) {
        consoleError(e);
    }
};
const getHostListenerTarget = (elm, flags) => {
    if (flags & 4 /* LISTENER_FLAGS.TargetDocument */)
        return doc;
    return elm;
};
// prettier-ignore
const hostListenerOpts = (flags) => (flags & 2 /* LISTENER_FLAGS.Capture */) !== 0;
const hostRefs = /*@__PURE__*/ new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerHost = (elm, cmpMeta) => {
    const hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $cmpMeta$: cmpMeta,
        $instanceValues$: new Map(),
    };
    {
        hostRef.$onInstancePromise$ = new Promise((r) => (hostRef.$onInstanceResolve$ = r));
    }
    {
        hostRef.$onReadyPromise$ = new Promise((r) => (hostRef.$onReadyResolve$ = r));
        elm['s-p'] = [];
        elm['s-rc'] = [];
    }
    addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
    return hostRefs.set(elm, hostRef);
};
const isMemberInElement = (elm, memberName) => memberName in elm;
const consoleError = (e, el) => (0, console.error)(e, el);
const cmpModules = /*@__PURE__*/ new Map();
const loadModule = (cmpMeta, hostRef, hmrVersionId) => {
    // loadModuleImport
    const exportName = cmpMeta.$tagName$.replace(/-/g, '_');
    const bundleId = cmpMeta.$lazyBundleId$;
    const module = cmpModules.get(bundleId) ;
    if (module) {
        return module[exportName];
    }
    /*!__STENCIL_STATIC_IMPORT_SWITCH__*/
    return import(
    /* @vite-ignore */
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.system\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${bundleId}.entry.js${''}`).then((importedModule) => {
        {
            cmpModules.set(bundleId, importedModule);
        }
        return importedModule[exportName];
    }, consoleError);
};
const styles = /*@__PURE__*/ new Map();
const win = typeof window !== 'undefined' ? window : {};
const doc = win.document || { head: {} };
const plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    jmp: (h) => h(),
    raf: (h) => requestAnimationFrame(h),
    ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
    rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
    ce: (eventName, opts) => new CustomEvent(eventName, opts),
};
const supportsShadow = true;
const promiseResolve = (v) => Promise.resolve(v);
const supportsConstructableStylesheets = /*@__PURE__*/ (() => {
        try {
            new CSSStyleSheet();
            return typeof new CSSStyleSheet().replaceSync === 'function';
        }
        catch (e) { }
        return false;
    })()
    ;
const queueDomReads = [];
const queueDomWrites = [];
const queueTask = (queue, write) => (cb) => {
    queue.push(cb);
    if (!queuePending) {
        queuePending = true;
        if (write && plt.$flags$ & 4 /* PLATFORM_FLAGS.queueSync */) {
            nextTick(flush);
        }
        else {
            plt.raf(flush);
        }
    }
};
const consume = (queue) => {
    for (let i = 0; i < queue.length; i++) {
        try {
            queue[i](performance.now());
        }
        catch (e) {
            consoleError(e);
        }
    }
    queue.length = 0;
};
const flush = () => {
    // always force a bunch of medium callbacks to run, but still have
    // a throttle on how many can run in a certain time
    // DOM READS!!!
    consume(queueDomReads);
    // DOM WRITES!!!
    {
        consume(queueDomWrites);
        if ((queuePending = queueDomReads.length > 0)) {
            // still more to do yet, but we've run out of time
            // let's let this thing cool off and try again in the next tick
            plt.raf(flush);
        }
    }
};
const nextTick = /*@__PURE__*/ (cb) => promiseResolve().then(cb);
const writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);

const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;
var DaysOfWeek$1;
(function (DaysOfWeek) {
  DaysOfWeek[DaysOfWeek["Sunday"] = 0] = "Sunday";
  DaysOfWeek[DaysOfWeek["Monday"] = 1] = "Monday";
  DaysOfWeek[DaysOfWeek["Tuesday"] = 2] = "Tuesday";
  DaysOfWeek[DaysOfWeek["Wednesday"] = 3] = "Wednesday";
  DaysOfWeek[DaysOfWeek["Thursday"] = 4] = "Thursday";
  DaysOfWeek[DaysOfWeek["Friday"] = 5] = "Friday";
  DaysOfWeek[DaysOfWeek["Saturday"] = 6] = "Saturday";
})(DaysOfWeek$1 || (DaysOfWeek$1 = {}));
function createDate$1(year, month, day) {
  var dayInt = parseInt(day, 10);
  var monthInt = parseInt(month, 10);
  var yearInt = parseInt(year, 10);
  const isValid = Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0;
  if (isValid) {
    return new Date(yearInt, monthInt - 1, dayInt);
  }
}
/**
 * @param value date string in ISO format YYYY-MM-DD
 */
function parseISODate(value) {
  if (!value) {
    return;
  }
  const matches = value.match(ISO_DATE_FORMAT);
  if (matches) {
    return createDate$1(matches[1], matches[2], matches[3]);
  }
}
/**
 * print date in format YYYY-MM-DD
 * @param date
 */
function printISODate(date) {
  if (!date) {
    return "";
  }
  var d = date.getDate().toString(10);
  var m = (date.getMonth() + 1).toString(10);
  var y = date.getFullYear().toString(10);
  // days are not zero-indexed, so pad if less than 10
  if (date.getDate() < 10) {
    d = `0${d}`;
  }
  // months *are* zero-indexed, pad if less than 9!
  if (date.getMonth() < 9) {
    m = `0${m}`;
  }
  return `${y}-${m}-${d}`;
}
/**
 * Compare if two dates are equal in terms of day, month, and year
 */
function isEqual(a, b) {
  if (a == null || b == null) {
    return false;
  }
  return isEqualMonth(a, b) && a.getDate() === b.getDate();
}
/**
 * Compare if two dates are in the same month of the same year.
 */
function isEqualMonth(a, b) {
  if (a == null || b == null) {
    return false;
  }
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function addDays(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function startOfWeek(date, firstDayOfWeek = DaysOfWeek$1.Monday) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  d.setDate(d.getDate() - diff);
  return d;
}
function endOfWeek(date, firstDayOfWeek = DaysOfWeek$1.Monday) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);
  d.setDate(d.getDate() + diff);
  return d;
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function setMonth(date, month) {
  const d = new Date(date);
  d.setMonth(month);
  return d;
}
function setYear(date, year) {
  const d = new Date(date);
  d.setFullYear(year);
  return d;
}
/**
 * Check if date is within a min and max
 */
function inRange(date, min, max) {
  return clamp(date, min, max) === date;
}
/**
 * Ensures date is within range, returns min or max if out of bounds
 */
function clamp(date, min, max) {
  const time = date.getTime();
  if (min && min instanceof Date && time < min.getTime()) {
    return min;
  }
  if (max && max instanceof Date && time > max.getTime()) {
    return max;
  }
  return date;
}
/**
 * given start and end date, return an (inclusive) array of all dates in between
 * @param start
 * @param end
 */
function getDaysInRange(start, end) {
  const days = [];
  let current = start;
  while (!isEqual(current, end)) {
    days.push(current);
    current = addDays(current, 1);
  }
  days.push(current);
  return days;
}
/**
 * given a date, return an array of dates from a calendar perspective
 * @param date
 * @param firstDayOfWeek
 */
function getViewOfMonth(date, firstDayOfWeek = DaysOfWeek$1.Monday) {
  const start = startOfWeek(startOfMonth(date), firstDayOfWeek);
  const end = endOfWeek(endOfMonth(date), firstDayOfWeek);
  return getDaysInRange(start, end);
}
/**
 * Form random hash
 */
function chr4() {
  return Math.random()
    .toString(16)
    .slice(-4);
}
/**
 * Create random identifier with a prefix
 * @param prefix
 */
function createIdentifier(prefix) {
  return `${prefix}-${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
}

const DatePickerInput = ({ onClick, dateFormatter, localization, name, formattedValue, valueAsDate, value, identifier, disabled, required, role, buttonRef, inputRef, onInput, onBlur, onFocus, }) => {
  return (h("div", { class: "duet-date__input-wrapper" },
    h("input", { class: "duet-date__input", value: formattedValue, placeholder: localization.placeholder, id: identifier, disabled: disabled, role: role, required: required ? true : undefined, "aria-autocomplete": "none", onInput: onInput, onFocus: onFocus, onBlur: onBlur, autoComplete: "off", ref: inputRef }),
    h("input", { type: "hidden", name: name, value: value }),
    h("button", { class: "duet-date__toggle", onClick: onClick, disabled: disabled, ref: buttonRef, type: "button" },
      h("span", { class: "duet-date__toggle-icon" },
        h("svg", { "aria-hidden": "true", height: "24", viewBox: "0 0 21 21", width: "24", xmlns: "http://www.w3.org/2000/svg" },
          h("g", { fill: "none", "fill-rule": "evenodd", transform: "translate(2 2)" },
            h("path", { d: "m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round" }),
            h("path", { d: "m.5 4.5h16", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round" }),
            h("g", { fill: "currentColor" },
              h("circle", { cx: "8.5", cy: "8.5", r: "1" }),
              h("circle", { cx: "4.5", cy: "8.5", r: "1" }),
              h("circle", { cx: "12.5", cy: "8.5", r: "1" }),
              h("circle", { cx: "8.5", cy: "12.5", r: "1" }),
              h("circle", { cx: "4.5", cy: "12.5", r: "1" }),
              h("circle", { cx: "12.5", cy: "12.5", r: "1" }))))),
      h("span", { class: "duet-date__vhidden" },
        localization.buttonLabel,
        valueAsDate && (h("span", null,
          ", ",
          localization.selectedDateMessage,
          " ",
          dateFormatter.format(valueAsDate)))))));
};

const DatePickerDay = ({ focusedDay, today, day, onDaySelect, onKeyboardNavigation, focusedDayRef, disabled, inRange, isSelected, dateFormatter, }) => {
  const isToday = isEqual(day, today);
  const isMonth = isEqualMonth(day, focusedDay);
  const isFocused = isEqual(day, focusedDay);
  const isOutsideRange = !inRange;
  function handleClick(e) {
    onDaySelect(e, day);
  }
  return (h("button", { class: {
      "duet-date__day": true,
      "is-outside": isOutsideRange,
      "is-today": isToday,
      "is-month": isMonth,
      "is-disabled": disabled,
    }, tabIndex: isFocused ? 0 : -1, onClick: handleClick, onKeyDown: onKeyboardNavigation, "aria-disabled": disabled ? "true" : undefined, disabled: isOutsideRange, type: "button", "aria-pressed": isSelected ? "true" : "false", ref: el => {
      if (isFocused && el && focusedDayRef) {
        focusedDayRef(el);
      }
    } },
    h("span", { "aria-hidden": "true" }, day.getDate()),
    h("span", { class: "duet-date__vhidden" }, dateFormatter.format(day))));
};

function chunk(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
function mapWithOffset(array, startingOffset, mapFn) {
  return array.map((_, i) => {
    const adjustedIndex = (i + startingOffset) % array.length;
    return mapFn(array[adjustedIndex]);
  });
}
const DatePickerMonth = ({ selectedDate, focusedDate, labelledById, localization, firstDayOfWeek, min, max, dateFormatter, isDateDisabled, onDateSelect, onKeyboardNavigation, focusedDayRef, }) => {
  const today = new Date();
  const days = getViewOfMonth(focusedDate, firstDayOfWeek);
  return (h("table", { class: "duet-date__table", "aria-labelledby": labelledById },
    h("thead", null,
      h("tr", null, mapWithOffset(localization.dayNames, firstDayOfWeek, dayName => (h("th", { class: "duet-date__table-header", scope: "col" },
        h("span", { "aria-hidden": "true" }, dayName.substr(0, 2)),
        h("span", { class: "duet-date__vhidden" }, dayName)))))),
    h("tbody", null, chunk(days, 7).map(week => (h("tr", { class: "duet-date__row" }, week.map(day => (h("td", { class: "duet-date__cell" },
      h(DatePickerDay, { day: day, today: today, focusedDay: focusedDate, isSelected: isEqual(day, selectedDate), disabled: isDateDisabled(day), inRange: inRange(day, min, max), onDaySelect: onDateSelect, dateFormatter: dateFormatter, onKeyboardNavigation: onKeyboardNavigation, focusedDayRef: focusedDayRef }))))))))));
};

const localization = {
  buttonLabel: "Choose date",
  placeholder: "YYYY-MM-DD",
  selectedDateMessage: "Selected date is",
  prevMonthLabel: "Previous month",
  nextMonthLabel: "Next month",
  monthSelectLabel: "Month",
  yearSelectLabel: "Year",
  closeLabel: "Close window",
  calendarHeading: "Choose a date",
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  locale: "en-GB",
};

const isoAdapter = { parse: parseISODate, format: printISODate };

const duetDatePickerCss = ".duet-date *,.duet-date *::before,.duet-date *::after{box-sizing:border-box;margin:0;width:auto}.duet-date{box-sizing:border-box;color:var(--duet-color-text);display:block;font-family:var(--duet-font);margin:0;position:relative;text-align:left;width:100%}.duet-date__input{-webkit-appearance:none;appearance:none;background:var(--duet-color-surface);border:1px solid var(--duet-color-border, var(--duet-color-text));border-radius:var(--duet-radius);color:var(--duet-color-text);float:none;font-family:var(--duet-font);font-size:100%;line-height:normal;padding:14px 60px 14px 14px;width:100%}.duet-date__input:focus{border-color:var(--duet-color-primary);box-shadow:0 0 0 1px var(--duet-color-primary);outline:0}.duet-date__input::-webkit-input-placeholder{color:var(--duet-color-placeholder);opacity:1}.duet-date__input:-moz-placeholder{color:var(--duet-color-placeholder);opacity:1}.duet-date__input:-ms-input-placeholder{color:var(--duet-color-placeholder)}.duet-date__input-wrapper{position:relative;width:100%}.duet-date__toggle{-moz-appearance:none;-webkit-appearance:none;-webkit-user-select:none;align-items:center;appearance:none;background:var(--duet-color-button);border:0;border-radius:0;border-bottom-right-radius:var(--duet-radius);border-top-right-radius:var(--duet-radius);box-shadow:inset 1px 0 0 rgba(0, 0, 0, 0.1);color:var(--duet-color-text);cursor:pointer;display:flex;height:calc(100% - 2px);justify-content:center;padding:0;position:absolute;right:1px;top:1px;user-select:none;width:48px;z-index:2}.duet-date__toggle:focus{box-shadow:0 0 0 2px var(--duet-color-primary);outline:0}.duet-date__toggle-icon{display:flex;flex-basis:100%;justify-content:center;align-items:center}.duet-date__dialog{display:flex;left:0;min-width:320px;opacity:0;position:absolute;top:100%;transform:scale(0.96) translateZ(0) translateY(-20px);transform-origin:top right;transition:transform 300ms ease, opacity 300ms ease, visibility 300ms ease;visibility:hidden;width:100%;will-change:transform, opacity, visibility;z-index:var(--duet-z-index)}@media (max-width: 35.9375em){.duet-date__dialog{background:var(--duet-color-overlay);bottom:0;position:fixed;right:0;top:0;transform:translateZ(0);transform-origin:bottom center}}.duet-date__dialog.is-left{left:auto;right:0;width:auto}.duet-date__dialog.is-active{opacity:1;transform:scale(1.0001) translateZ(0) translateY(0);visibility:visible}.duet-date__dialog-content{background:var(--duet-color-surface);border:1px solid rgba(0, 0, 0, 0.1);border-radius:var(--duet-radius);box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.1);margin-left:auto;margin-top:8px;max-width:310px;min-width:290px;padding:16px 16px 20px;position:relative;transform:none;width:100%;z-index:var(--duet-z-index)}@media (max-width: 35.9375em){.duet-date__dialog-content{border:0;border-radius:0;border-top-left-radius:var(--duet-radius);border-top-right-radius:var(--duet-radius);bottom:0;left:0;margin:0;max-width:none;min-height:26em;opacity:0;padding:0 8% 20px;position:absolute;transform:translateZ(0) translateY(100%);transition:transform 400ms ease, opacity 400ms ease, visibility 400ms ease;visibility:hidden;will-change:transform, opacity, visibility}.is-active .duet-date__dialog-content{opacity:1;transform:translateZ(0) translateY(0);visibility:visible}}.duet-date__table{border-collapse:collapse;border-spacing:0;color:var(--duet-color-text);font-size:1rem;font-weight:var(--duet-font-normal);line-height:1.25;text-align:center;width:100%}.duet-date__table-header{font-size:0.75rem;font-weight:var(--duet-font-bold);letter-spacing:1px;line-height:1.25;padding-bottom:8px;text-decoration:none;text-transform:uppercase}.duet-date__cell{text-align:center}.duet-date__day{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:transparent;border:0;border-radius:50%;color:var(--duet-color-text);cursor:pointer;display:inline-block;font-family:var(--duet-font);font-size:0.875rem;font-variant-numeric:tabular-nums;font-weight:var(--duet-font-normal);height:36px;line-height:1.25;padding:0 0 1px;position:relative;text-align:center;vertical-align:middle;width:36px;z-index:1}.duet-date__day.is-today{box-shadow:0 0 0 1px var(--duet-color-primary);position:relative;z-index:200}.duet-date__day:hover::before,.duet-date__day.is-today::before{background:var(--duet-color-primary);border-radius:50%;bottom:0;content:\"\";left:0;opacity:0.06;position:absolute;right:0;top:0}.duet-date__day[aria-pressed=true],.duet-date__day:focus{background:var(--duet-color-primary);box-shadow:none;color:var(--duet-color-text-active);outline:0}.duet-date__day:active{background:var(--duet-color-primary);box-shadow:0 0 5px var(--duet-color-primary);color:var(--duet-color-text-active);z-index:200}.duet-date__day:focus{box-shadow:0 0 5px var(--duet-color-primary);z-index:200}.duet-date__day:not(.is-month){box-shadow:none}.duet-date__day:not(.is-month),.duet-date__day[aria-disabled=true]{background:transparent;color:var(--duet-color-text);cursor:default;opacity:0.5}.duet-date__day[aria-disabled=true].is-today{box-shadow:0 0 0 1px var(--duet-color-primary)}.duet-date__day[aria-disabled=true].is-today:focus{box-shadow:0 0 5px var(--duet-color-primary);background:var(--duet-color-primary);color:var(--duet-color-text-active)}.duet-date__day[aria-disabled=true]:not(.is-today)::before{display:none}.duet-date__day.is-outside{background:var(--duet-color-button);box-shadow:none;color:var(--duet-color-text);cursor:default;opacity:0.6;pointer-events:none}.duet-date__day.is-outside::before{display:none}.duet-date__header{align-items:center;display:flex;justify-content:space-between;margin-bottom:16px;width:100%}.duet-date__nav{white-space:nowrap}.duet-date__prev,.duet-date__next{-moz-appearance:none;-webkit-appearance:none;align-items:center;appearance:none;background:var(--duet-color-button);border:0;border-radius:50%;color:var(--duet-color-text);cursor:pointer;display:inline-flex;height:32px;justify-content:center;margin-left:8px;padding:0;transition:background-color 300ms ease;width:32px}@media (max-width: 35.9375em){.duet-date__prev,.duet-date__next{height:40px;width:40px}}.duet-date__prev:focus,.duet-date__next:focus{box-shadow:0 0 0 2px var(--duet-color-primary);outline:0}.duet-date__prev:active:focus,.duet-date__next:active:focus{box-shadow:none}.duet-date__prev:disabled,.duet-date__next:disabled{cursor:default;opacity:0.5}.duet-date__prev svg,.duet-date__next svg{margin:0 auto}.duet-date__select{display:inline-flex;margin-top:4px;position:relative}.duet-date__select span{margin-right:4px}.duet-date__select select{cursor:pointer;font-size:1rem;height:100%;left:0;opacity:0;position:absolute;top:0;width:100%;z-index:2}.duet-date__select select:focus+.duet-date__select-label{box-shadow:0 0 0 2px var(--duet-color-primary)}.duet-date__select-label{align-items:center;border-radius:var(--duet-radius);color:var(--duet-color-text);display:flex;font-size:1.25rem;font-weight:var(--duet-font-bold);line-height:1.25;padding:0 4px 0 8px;pointer-events:none;position:relative;width:100%;z-index:1}.duet-date__select-label svg{width:16px;height:16px}.duet-date__mobile{align-items:center;border-bottom:1px solid rgba(0, 0, 0, 0.12);display:flex;justify-content:space-between;margin-bottom:20px;margin-left:-10%;overflow:hidden;padding:12px 20px;position:relative;text-overflow:ellipsis;white-space:nowrap;width:120%}@media (min-width: 36em){.duet-date__mobile{border:0;margin:0;overflow:visible;padding:0;position:absolute;right:-8px;top:-8px;width:auto}}.duet-date__mobile-heading{display:inline-block;font-weight:var(--duet-font-bold);max-width:84%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media (min-width: 36em){.duet-date__mobile-heading{display:none}}.duet-date__close{-webkit-appearance:none;align-items:center;appearance:none;background:var(--duet-color-button);border:0;border-radius:50%;color:var(--duet-color-text);cursor:pointer;display:flex;height:24px;justify-content:center;padding:0;width:24px}@media (min-width: 36em){.duet-date__close{opacity:0}}.duet-date__close:focus{box-shadow:0 0 0 2px var(--duet-color-primary);outline:none}@media (min-width: 36em){.duet-date__close:focus{opacity:1}}.duet-date__close svg{margin:0 auto}.duet-date__vhidden{border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;overflow:hidden;padding:0;position:absolute;top:0;width:1px}";

function range(from, to) {
  var result = [];
  for (var i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
}
const keyCode = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};
function cleanValue(input, regex) {
  const value = input.value;
  const cursor = input.selectionStart;
  const beforeCursor = value.slice(0, cursor);
  const afterCursor = value.slice(cursor, value.length);
  const filteredBeforeCursor = beforeCursor.replace(regex, "");
  const filterAfterCursor = afterCursor.replace(regex, "");
  const newValue = filteredBeforeCursor + filterAfterCursor;
  const newCursor = filteredBeforeCursor.length;
  input.value = newValue;
  input.selectionStart = input.selectionEnd = newCursor;
  return newValue;
}
const DISALLOWED_CHARACTERS = /[^0-9\.\/\-]+/g;
const TRANSITION_MS = 300;
const DuetDatePicker = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.duetChange = createEvent(this, "duetChange", 7);
    this.duetBlur = createEvent(this, "duetBlur", 7);
    this.duetFocus = createEvent(this, "duetFocus", 7);
    this.duetOpen = createEvent(this, "duetOpen", 7);
    this.duetClose = createEvent(this, "duetClose", 7);
    /**
     * Own Properties
     */
    this.monthSelectId = createIdentifier("DuetDateMonth");
    this.yearSelectId = createIdentifier("DuetDateYear");
    this.dialogLabelId = createIdentifier("DuetDateLabel");
    this.initialTouchX = null;
    this.initialTouchY = null;
    /**
     * State() variables
     */
    this.activeFocus = false;
    this.focusedDay = new Date();
    this.open = false;
    /**
     * Public Property API
     */
    /**
     * Name of the date picker input.
     */
    this.name = "date";
    /**
     * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
     */
    this.identifier = "";
    /**
     * Makes the date picker input component disabled. This prevents users from being able to
     * interact with the input, and conveys its inactive state to assistive technologies.
     */
    this.disabled = false;
    /**
     * Forces the opening direction of the calendar modal to be always left or right.
     * This setting can be useful when the input is smaller than the opening date picker
     * would be as by default the picker always opens towards right.
     */
    this.direction = "right";
    /**
     * Should the input be marked as required?
     */
    this.required = false;
    /**
     * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
     */
    this.value = "";
    /**
     * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the max property.
     */
    this.min = "";
    /**
     * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the min property.
     */
    this.max = "";
    /**
     * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
     * Default is Monday.
     */
    this.firstDayOfWeek = DaysOfWeek$1.Monday;
    /**
     * Button labels, day names, month names, etc, used for localization.
     * Default is English.
     */
    this.localization = localization;
    /**
     * Date adapter, for custom parsing/formatting.
     * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
     * and a `format` function which accepts a `Date` and returns a `string`.
     * Default is IS0-8601 parsing and formatting.
     */
    this.dateAdapter = isoAdapter;
    /**
     * Controls which days are disabled and therefore disallowed.
     * For example, this can be used to disallow selection of weekends.
     */
    this.isDateDisabled = () => false;
    /**
     * Local methods.
     */
    this.enableActiveFocus = () => {
      this.activeFocus = true;
    };
    this.disableActiveFocus = () => {
      this.activeFocus = false;
    };
    this.toggleOpen = (e) => {
      e.preventDefault();
      this.open ? this.hide(false) : this.show();
    };
    this.handleEscKey = (event) => {
      if (event.keyCode === keyCode.ESC) {
        this.hide();
      }
    };
    this.handleBlur = (event) => {
      event.stopPropagation();
      this.duetBlur.emit({
        component: "duet-date-picker",
      });
    };
    this.handleFocus = (event) => {
      event.stopPropagation();
      this.duetFocus.emit({
        component: "duet-date-picker",
      });
    };
    this.handleTouchStart = (event) => {
      const touch = event.changedTouches[0];
      this.initialTouchX = touch.pageX;
      this.initialTouchY = touch.pageY;
    };
    this.handleTouchMove = (event) => {
      event.preventDefault();
    };
    this.handleTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      const distX = touch.pageX - this.initialTouchX; // get horizontal dist traveled
      const distY = touch.pageY - this.initialTouchY; // get vertical dist traveled
      const threshold = 70;
      const isHorizontalSwipe = Math.abs(distX) >= threshold && Math.abs(distY) <= threshold;
      const isDownwardsSwipe = Math.abs(distY) >= threshold && Math.abs(distX) <= threshold && distY > 0;
      if (isHorizontalSwipe) {
        this.addMonths(distX < 0 ? 1 : -1);
      }
      else if (isDownwardsSwipe) {
        this.hide(false);
        event.preventDefault();
      }
      this.initialTouchY = null;
      this.initialTouchX = null;
    };
    this.handleNextMonthClick = (event) => {
      event.preventDefault();
      this.addMonths(1);
    };
    this.handlePreviousMonthClick = (event) => {
      event.preventDefault();
      this.addMonths(-1);
    };
    this.handleFirstFocusableKeydown = (event) => {
      // this ensures focus is trapped inside the dialog
      if (event.keyCode === keyCode.TAB && event.shiftKey) {
        this.focusedDayNode.focus();
        event.preventDefault();
      }
    };
    this.handleKeyboardNavigation = (event) => {
      // handle tab separately, since it needs to be treated
      // differently to other keyboard interactions
      if (event.keyCode === keyCode.TAB && !event.shiftKey) {
        event.preventDefault();
        this.firstFocusableElement.focus();
        return;
      }
      var handled = true;
      switch (event.keyCode) {
        case keyCode.RIGHT:
          this.addDays(1);
          break;
        case keyCode.LEFT:
          this.addDays(-1);
          break;
        case keyCode.DOWN:
          this.addDays(7);
          break;
        case keyCode.UP:
          this.addDays(-7);
          break;
        case keyCode.PAGE_UP:
          if (event.shiftKey) {
            this.addYears(-1);
          }
          else {
            this.addMonths(-1);
          }
          break;
        case keyCode.PAGE_DOWN:
          if (event.shiftKey) {
            this.addYears(1);
          }
          else {
            this.addMonths(1);
          }
          break;
        case keyCode.HOME:
          this.startOfWeek();
          break;
        case keyCode.END:
          this.endOfWeek();
          break;
        default:
          handled = false;
      }
      if (handled) {
        event.preventDefault();
        this.enableActiveFocus();
      }
    };
    this.handleDaySelect = (_event, day) => {
      const isInRange = inRange(day, parseISODate(this.min), parseISODate(this.max));
      const isAllowed = !this.isDateDisabled(day);
      if (isInRange && isAllowed) {
        this.setValue(day);
        this.hide();
      }
      else {
        // for consistency we should set the focused day in cases where
        // user has selected a day that has been specifically disallowed
        this.setFocusedDay(day);
      }
    };
    this.handleMonthSelect = e => {
      this.setMonth(parseInt(e.target.value, 10));
    };
    this.handleYearSelect = e => {
      this.setYear(parseInt(e.target.value, 10));
    };
    this.handleInputChange = () => {
      const target = this.datePickerInput;
      // clean up any invalid characters
      cleanValue(target, DISALLOWED_CHARACTERS);
      const parsed = this.dateAdapter.parse(target.value, createDate$1);
      if (parsed || target.value === "") {
        this.setValue(parsed);
      }
    };
    this.processFocusedDayNode = (element) => {
      this.focusedDayNode = element;
      if (this.activeFocus && this.open) {
        setTimeout(() => element.focus(), 0);
      }
    };
  }
  connectedCallback() {
    this.createDateFormatters();
  }
  createDateFormatters() {
    this.dateFormatShort = new Intl.DateTimeFormat(this.localization.locale, { day: "numeric", month: "long" });
    this.dateFormatLong = new Intl.DateTimeFormat(this.localization.locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  /**
   * Component event handling.
   */
  handleDocumentClick(e) {
    if (!this.open) {
      return;
    }
    // the dialog and the button aren't considered clicks outside.
    // dialog for obvious reasons, but the button needs to be skipped
    // so that two things are possible:
    //
    // a) clicking again on the button when dialog is open should close the modal.
    //    without skipping the button here, we would see a click outside
    //    _and_ a click on the button, so the `open` state goes
    //    open -> close (click outside) -> open (click button)
    //
    // b) clicking another date picker's button should close the current calendar
    //    and open the new one. this means we can't stopPropagation() on the button itself
    //
    // this was the only satisfactory combination of things to get the above to work
    const isClickOutside = e
      .composedPath()
      .every(node => node !== this.dialogWrapperNode && node !== this.datePickerButton);
    if (isClickOutside) {
      this.hide(false);
    }
  }
  /**
   * Public methods API
   */
  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  async setFocus() {
    return this.datePickerInput.focus();
  }
  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  async show() {
    this.open = true;
    this.duetOpen.emit({
      component: "duet-date-picker",
    });
    this.setFocusedDay(parseISODate(this.value) || new Date());
    clearTimeout(this.focusTimeoutId);
    this.focusTimeoutId = setTimeout(() => this.monthSelectNode.focus(), TRANSITION_MS);
  }
  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  async hide(moveFocusToButton = true) {
    this.open = false;
    this.duetClose.emit({
      component: "duet-date-picker",
    });
    // in cases where calendar is quickly shown and hidden
    // we should avoid moving focus to the button
    clearTimeout(this.focusTimeoutId);
    if (moveFocusToButton) {
      // iOS VoiceOver needs to wait for all transitions to finish.
      setTimeout(() => this.datePickerButton.focus(), TRANSITION_MS + 200);
    }
  }
  addDays(days) {
    this.setFocusedDay(addDays(this.focusedDay, days));
  }
  addMonths(months) {
    this.setMonth(this.focusedDay.getMonth() + months);
  }
  addYears(years) {
    this.setYear(this.focusedDay.getFullYear() + years);
  }
  startOfWeek() {
    this.setFocusedDay(startOfWeek(this.focusedDay, this.firstDayOfWeek));
  }
  endOfWeek() {
    this.setFocusedDay(endOfWeek(this.focusedDay, this.firstDayOfWeek));
  }
  setMonth(month) {
    const min = setMonth(startOfMonth(this.focusedDay), month);
    const max = endOfMonth(min);
    const date = setMonth(this.focusedDay, month);
    this.setFocusedDay(clamp(date, min, max));
  }
  setYear(year) {
    const min = setYear(startOfMonth(this.focusedDay), year);
    const max = endOfMonth(min);
    const date = setYear(this.focusedDay, year);
    this.setFocusedDay(clamp(date, min, max));
  }
  setFocusedDay(day) {
    this.focusedDay = clamp(day, parseISODate(this.min), parseISODate(this.max));
  }
  setValue(date) {
    this.value = printISODate(date);
    this.duetChange.emit({
      component: "duet-date-picker",
      value: this.value,
      valueAsDate: date,
    });
  }
  /**
   * render() function
   * Always the last one in the class.
   */
  render() {
    const valueAsDate = parseISODate(this.value);
    const formattedDate = valueAsDate && this.dateAdapter.format(valueAsDate);
    const selectedYear = (valueAsDate || this.focusedDay).getFullYear();
    const focusedMonth = this.focusedDay.getMonth();
    const focusedYear = this.focusedDay.getFullYear();
    const minDate = parseISODate(this.min);
    const maxDate = parseISODate(this.max);
    const prevMonthDisabled = minDate != null && minDate.getMonth() === focusedMonth && minDate.getFullYear() === focusedYear;
    const nextMonthDisabled = maxDate != null && maxDate.getMonth() === focusedMonth && maxDate.getFullYear() === focusedYear;
    const minYear = minDate ? minDate.getFullYear() : selectedYear - 10;
    const maxYear = maxDate ? maxDate.getFullYear() : selectedYear + 10;
    return (h(Host, null, h("div", { class: "duet-date" }, h(DatePickerInput, { dateFormatter: this.dateFormatLong, value: this.value, valueAsDate: valueAsDate, formattedValue: formattedDate, onInput: this.handleInputChange, onBlur: this.handleBlur, onFocus: this.handleFocus, onClick: this.toggleOpen, name: this.name, disabled: this.disabled, role: this.role, required: this.required, identifier: this.identifier, localization: this.localization, buttonRef: element => (this.datePickerButton = element), inputRef: element => (this.datePickerInput = element) }), h("div", { class: {
        "duet-date__dialog": true,
        "is-left": this.direction === "left",
        "is-active": this.open,
      }, role: "dialog", "aria-modal": "true", "aria-hidden": this.open ? "false" : "true", "aria-labelledby": this.dialogLabelId, onTouchMove: this.handleTouchMove, onTouchStart: this.handleTouchStart, onTouchEnd: this.handleTouchEnd }, h("div", { class: "duet-date__dialog-content", onKeyDown: this.handleEscKey, ref: element => (this.dialogWrapperNode = element) }, h("div", { class: "duet-date__mobile", onFocusin: this.disableActiveFocus }, h("label", { class: "duet-date__mobile-heading" }, this.localization.calendarHeading), h("button", { class: "duet-date__close", ref: element => (this.firstFocusableElement = element), onKeyDown: this.handleFirstFocusableKeydown, onClick: () => this.hide(), type: "button" }, h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" }, h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), h("path", { d: "M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" })), h("span", { class: "duet-date__vhidden" }, this.localization.closeLabel))), h("div", { class: "duet-date__header", onFocusin: this.disableActiveFocus }, h("div", null, h("h2", { id: this.dialogLabelId, class: "duet-date__vhidden", "aria-live": "polite", "aria-atomic": "true" }, this.localization.monthNames[focusedMonth], " ", this.focusedDay.getFullYear()), h("label", { htmlFor: this.monthSelectId, class: "duet-date__vhidden" }, this.localization.monthSelectLabel), h("div", { class: "duet-date__select" }, h("select", { id: this.monthSelectId, class: "duet-date__select--month", ref: element => (this.monthSelectNode = element), onChange: this.handleMonthSelect }, this.localization.monthNames.map((month, i) => (h("option", { key: month, value: i, selected: i === focusedMonth, disabled: !inRange(new Date(focusedYear, i, 1), minDate ? startOfMonth(minDate) : null, maxDate ? endOfMonth(maxDate) : null) }, month)))), h("div", { class: "duet-date__select-label", "aria-hidden": "true" }, h("span", null, this.localization.monthNamesShort[focusedMonth]), h("svg", { fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" }, h("path", { d: "M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" })))), h("label", { htmlFor: this.yearSelectId, class: "duet-date__vhidden" }, this.localization.yearSelectLabel), h("div", { class: "duet-date__select" }, h("select", { id: this.yearSelectId, class: "duet-date__select--year", onChange: this.handleYearSelect }, range(minYear, maxYear).map(year => (h("option", { key: year, selected: year === focusedYear }, year)))), h("div", { class: "duet-date__select-label", "aria-hidden": "true" }, h("span", null, this.focusedDay.getFullYear()), h("svg", { fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" }, h("path", { d: "M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" }))))), h("div", { class: "duet-date__nav" }, h("button", { class: "duet-date__prev", onClick: this.handlePreviousMonthClick, disabled: prevMonthDisabled, type: "button" }, h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "21", height: "21", viewBox: "0 0 24 24" }, h("path", { d: "M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" })), h("span", { class: "duet-date__vhidden" }, this.localization.prevMonthLabel)), h("button", { class: "duet-date__next", onClick: this.handleNextMonthClick, disabled: nextMonthDisabled, type: "button" }, h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "21", height: "21", viewBox: "0 0 24 24" }, h("path", { d: "M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z" })), h("span", { class: "duet-date__vhidden" }, this.localization.nextMonthLabel)))), h(DatePickerMonth, { dateFormatter: this.dateFormatShort, selectedDate: valueAsDate, focusedDate: this.focusedDay, onDateSelect: this.handleDaySelect, onKeyboardNavigation: this.handleKeyboardNavigation, labelledById: this.dialogLabelId, localization: this.localization, firstDayOfWeek: this.firstDayOfWeek, focusedDayRef: this.processFocusedDayNode, min: minDate, max: maxDate, isDateDisabled: this.isDateDisabled }))))));
  }
  get element() { return this; }
  static get watchers() { return {
    "localization": ["createDateFormatters"]
  }; }
  static get style() { return duetDatePickerCss; }
};

const DuetDatePicker$1 = /*@__PURE__*/proxyCustomElement(DuetDatePicker, [0,"duet-date-picker",{"name":[1],"identifier":[1],"disabled":[516],"role":[1],"direction":[1],"required":[4],"value":[1537],"min":[1],"max":[1],"firstDayOfWeek":[2,"first-day-of-week"],"localization":[16],"dateAdapter":[16],"isDateDisabled":[16],"activeFocus":[32],"focusedDay":[32],"open":[32]},[[6,"click","handleDocumentClick"]]]);

var DaysOfWeek;
(function (DaysOfWeek) {
  DaysOfWeek[DaysOfWeek["Sunday"] = 0] = "Sunday";
  DaysOfWeek[DaysOfWeek["Monday"] = 1] = "Monday";
  DaysOfWeek[DaysOfWeek["Tuesday"] = 2] = "Tuesday";
  DaysOfWeek[DaysOfWeek["Wednesday"] = 3] = "Wednesday";
  DaysOfWeek[DaysOfWeek["Thursday"] = 4] = "Thursday";
  DaysOfWeek[DaysOfWeek["Friday"] = 5] = "Friday";
  DaysOfWeek[DaysOfWeek["Saturday"] = 6] = "Saturday";
})(DaysOfWeek || (DaysOfWeek = {}));

var _a;
const translations = {
  en: {
    buttonLabel: 'Choose date',
    placeholder: '',
    helpText: 'Format: dd-mm-yyyy',
    selectedDateMessage: 'Selected date is',
    prevMonthLabel: 'Previous month',
    nextMonthLabel: 'Next month',
    monthSelectLabel: 'Month',
    yearSelectLabel: 'Year',
    closeLabel: 'Close window',
    calendarHeading: 'Choose a date',
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    locale: 'en-GB',
  },
  nl: {
    buttonLabel: 'Kies datum',
    placeholder: '',
    helpText: 'Formaat: DD-MM-JJJJ',
    selectedDateMessage: 'De gekozen datum is',
    prevMonthLabel: 'Vorige maand',
    nextMonthLabel: 'Volgende maand',
    monthSelectLabel: 'Maand',
    yearSelectLabel: 'Jaar',
    closeLabel: 'Venster sluiten',
    calendarHeading: 'Kies een datum',
    dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    monthNames: [
      'januari',
      'februari',
      'maart',
      'april',
      'mei',
      'juni',
      'juli',
      'augustus',
      'september',
      'oktober',
      'november',
      'december',
    ],
    monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
    locale: 'nl-NL',
  },
  de: {
    buttonLabel: 'Datum wählen',
    placeholder: '',
    helpText: 'Format: TT-MM-JJJJ',
    selectedDateMessage: 'Das gewählte Datum ist',
    prevMonthLabel: 'Letzter Monat',
    nextMonthLabel: 'Nächster Monat',
    monthSelectLabel: 'Monat',
    yearSelectLabel: 'Jahr',
    closeLabel: 'Fenster schließen',
    calendarHeading: 'Wählen Sie ein Datum',
    dayNames: ['Sonntag', 'Monta', 'Dienstag', 'Mittwog', 'Donnerstag', 'Freitag', 'Samstag'],
    monthNames: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'December',
    ],
    monthNamesShort: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    locale: 'de-DE',
  },
  fr: {
    buttonLabel: 'Choisir la date',
    placeholder: '',
    helpText: 'Format: jj-mm-aaaa',
    selectedDateMessage: 'La date choisie est',
    prevMonthLabel: 'Mois précédent',
    nextMonthLabel: 'Le mois prochain',
    monthSelectLabel: 'Mois',
    yearSelectLabel: 'Année',
    closeLabel: 'Fermer la fenêtre',
    calendarHeading: 'Choisissez une date',
    dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    monthNames: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
    monthNamesShort: ['jan', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'dec'],
    locale: 'fr-FR',
  },
};
const extractLanguageSubtag = (language) => {
  if (language.indexOf('-') !== -1) {
    language = language.split('-')[0];
  }
  if (language.indexOf('_') !== -1) {
    language = language.split('_')[0];
  }
  return language;
};
const determineLanguage = () => {
  const documentLang = document.documentElement.lang;
  if (documentLang) {
    return extractLanguageSubtag(documentLang);
  }
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return undefined;
  }
  let browserLang = window.navigator.languages && window.navigator.languages.length > 0 ? window.navigator.languages[0] : null;
  browserLang = browserLang || window.navigator.language;
  if (typeof browserLang === 'undefined') {
    return undefined;
  }
  return extractLanguageSubtag(browserLang);
};
// Default to english if browser language is not supported
const browserLocalization = (_a = translations[determineLanguage()]) !== null && _a !== void 0 ? _a : translations['en'];

const DAYMONTHYEAR_DATE_FORMAT = /^(\d{2})-(\d{2})-(\d{4})$/;
function createDate(year, month, day) {
  var dayInt = parseInt(day, 10);
  var monthInt = parseInt(month, 10);
  var yearInt = parseInt(year, 10);
  const isValid = Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0;
  if (isValid) {
    return new Date(yearInt, monthInt - 1, dayInt);
  }
}
/**
 * @param value date string in ISO format DD-MM-YYYY
 */
function parseDayMonthYearDate(value) {
  if (!value) {
    return;
  }
  const matches = value.match(DAYMONTHYEAR_DATE_FORMAT);
  if (matches) {
    return createDate(matches[3], matches[2], matches[1]);
  }
}
/**
 * print date in format DD-MM-YYYY
 * @param date
 */
function printDayMonthYearDate(date) {
  if (!date) {
    return '';
  }
  var d = date.getDate().toString(10);
  var m = (date.getMonth() + 1).toString(10);
  var y = date.getFullYear().toString(10);
  // days are not zero-indexed, so pad if less than 10
  if (date.getDate() < 10) {
    d = `0${d}`;
  }
  // months *are* zero-indexed, pad if less than 9!
  if (date.getMonth() < 9) {
    m = `0${m}`;
  }
  return `${d}-${m}-${y}`;
}

const dayMonthYearAdapter = { parse: parseDayMonthYearDate, format: printDayMonthYearDate };

const datePickerCss = ".form-control .form-control-label{display:none}.form-control .form-control-help-text{display:none}.form-control .form-control-invalid-text{display:none}.form-control-has-label .form-control-label{display:flex;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-label-color);margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-label.form-control-small .form-control-label{font-size:var(--gr-form-element-label-font-size-small)}.form-control-has-label.form-control-medium .form-control-label{font-size:var(--gr-form-element-label-font-size-medium)}.form-control-has-label.form-control-large .form-control-label{font-size:var(--gr-form-element-label-font-size-large)}.form-control-has-label .form-control-label .asterisk{margin-left:var(--gr-spacing-x-small);color:var(--gr-color-medium)}.form-control-has-label .form-control-label .asterisk svg{width:0.6em;height:0.6em;margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-help-text .form-control-help-text{display:block;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-help-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-help-text.form-control-small .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-small);min-height:1.625rem}.form-control-has-help-text.form-control-medium .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-medium);min-height:1.875rem}.form-control-has-help-text.form-control-large .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-large);min-height:2.125rem}.form-control-has-invalid-text .form-control-invalid-text{display:flex;margin-left:-2px;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-invalid-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon{margin-top:var(--gr-spacing-xxx-small);margin-right:var(--gr-spacing-xx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon svg{width:1.4em;height:1.4em}.form-control-has-invalid-text.form-control-small .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-small);min-height:1.625rem}.form-control-has-invalid-text.form-control-medium .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-medium);min-height:1.875rem}.form-control-has-invalid-text.form-control-large .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-large);min-height:2.125rem}.gr-scroll-lock{overflow:hidden !important}:host{display:block;--selected-day-background-color:var(--gr-color-primary);--selected-day-color:var(--gr-color-primary-contrast);--input-background-color:var(--gr-color-white);--input-background-color-invalid:var(--gr-color-white);--input-background-color-invalid-hover:var(--gr-color-white);--input-color:var(--gr-color-dark-tint);--button-background-color:var(--gr-color-light);--button-color:var(--gr-color-dark-tint);--input-border-color:var(--gr-color-light-shade);--input-border-color-hover:var(--gr-color-medium);--input-border-color-invalid:var(--gr-color-danger);--input-border-color-invalid-hover:var(--gr-color-danger-shade);--placeholder-color:var(--gr-color-medium-tint);--backdrop-color:rgba(var(--gr-color-dark-rgb), 0.8);--min-height:var(--gr-form-element-height-medium);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);--focus-border-color:var(--gr-color-primary);--panel-background-color:var(--gr-color-white);--panel-border-radius:var(--gr-border-radius-medium);--panel-border-color:var(--gr-panel-border-color);--panel-box-shadow:var(--gr-shadow-large)}.duet-date{--duet-color-primary:var(--gr-color-primary);--duet-color-text:var(--input-color);--duet-color-text-active:var(--gr-color-primary-contrast);--duet-color-placeholder:var(--placeholder-color);--duet-color-button:var(--button-background-color);--duet-color-surface:var(--input-background-color);--duet-color-overlay:var(--backdrop-color);--duet-color-border:var(--input-border-color);--duet-font:var(--gr-font-family);--duet-font-normal:var(--gr-font-weight-normal);--duet-font-bold:var(--gr-font-weight-bold);--duet-radius:var(--gr-form-element-border-radius-medium);--duet-z-index:var(--gr-z-index-dropdown)}.duet-date .duet-date__input{min-height:var(--min-height)}.duet-date .duet-date__input:focus{border-color:var(--focus-border-color);box-shadow:var(--focus-ring)}.duet-date .duet-date__input:hover{border-color:var(--input-border-color-hover)}.duet-date .duet-date__toggle{color:var(--button-color)}.duet-date .duet-date__toggle:focus{box-shadow:var(--focus-ring);border:1px solid var(--focus-border-color)}.duet-date .duet-date__prev:focus,.duet-date .duet-date__next:focus{box-shadow:var(--focus-ring);border:1px solid var(--focus-border-color)}.duet-date .duet-date__close:focus{border:1px solid var(--focus-border-color);box-shadow:var(--focus-ring)}.duet-date .duet-date__day[aria-pressed=true],.duet-date .duet-date__day:focus{background:var(--selected-day-background-color);color:var(--selected-day-color)}.duet-date .duet-date__day:focus{box-shadow:var(--focus-ring)}.duet-date .duet-date__select select:focus+.duet-date__select-label{box-shadow:var(--focus-ring);border:1px solid var(--focus-border-color)}.duet-date .duet-date__dialog-content{box-shadow:var(--panel-box-shadow);border:1px solid var(--panel-border-color);border-radius:var(--panel-border-radius);background:var(--panel-background-color)}.date-picker-invalid:not(.date-picker-disabled) .duet-date .duet-date__input{background-color:var(--input-background-color-invalid);border-color:var(--input-border-color-invalid)}.date-picker-invalid:not(.date-picker-disabled):not(.select-focused) .duet-date .duet-date__input:hover{background-color:var(--input-background-color-invalid-hover);border-color:var(--input-border-color-invalid-hover)}.date-picker-invalid:not(.date-picker-disabled) .duet-date .duet-date__input{background-color:var(--input-background-color-invalid);border-color:var(--input-border-color-invalid)}.date-picker-invalid:not(.date-picker-disabled) .duet-date .duet-date__input:focus{border-color:var(--focus-border-color)}.date-picker-invalid:not(.date-picker-disabled) .duet-date .duet-date__input:focus:hover{border-color:var(--focus-border-color)}.date-picker-disabled .duet-date .duet-date__input{cursor:not-allowed;opacity:0.5;outline:none}.date-picker-disabled .duet-date .duet-date__toggle{cursor:not-allowed;opacity:0.5;outline:none}.date-picker-disabled .duet-date .duet-date__input:hover{border-color:var(--input-border-color)}";

let id = 0;
if (typeof customElements !== 'undefined' && !customElements.get('duet-date-picker')) {
  customElements.define('duet-date-picker', DuetDatePicker$1);
}
const DatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.grChange = createEvent$1(this, "gr-change", 7);
    this.grFocus = createEvent$1(this, "gr-focus", 7);
    this.grBlur = createEvent$1(this, "gr-blur", 7);
    this.grOpen = createEvent$1(this, "gr-open", 7);
    this.grClose = createEvent$1(this, "gr-close", 7);
    this.inputId = `date-picker-${++id}`;
    this.labelId = `date-picker-label-${id}`;
    this.helpTextId = `date-picker-help-text-${id}`;
    this.invalidTextId = `date-picker-invalid-text-${id}`;
    this.hasHelpTextSlot = false;
    this.hasInvalidTextSlot = false;
    this.hasLabelSlot = false;
    this.name = '';
    this.placeholder = '';
    this.disabled = false;
    this.direction = 'right';
    this.value = '';
    this.min = '';
    this.max = '';
    this.firstDayOfWeek = DaysOfWeek.Monday;
    this.isDateDisabled = () => false;
    this.label = '';
    this.requiredIndicator = false;
    this.helpText = '';
    this.invalidText = '';
    this.invalid = false;
    this.localization = browserLocalization;
  }
  handleLabelChange() {
    this.handleSlotChange();
  }
  connectedCallback() {
    this.handleDuetChange = this.handleDuetChange.bind(this);
    this.handleDuetFocus = this.handleDuetFocus.bind(this);
    this.handleDuetBlur = this.handleDuetBlur.bind(this);
    this.handleDuetOpen = this.handleDuetOpen.bind(this);
    this.handleDuetClose = this.handleDuetClose.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }
  componentWillLoad() {
    this.handleSlotChange();
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  async setFocus() {
    return this.duetDatePicker.setFocus();
  }
  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  async show() {
    this.duetDatePicker.show();
  }
  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  async hide(moveFocusToButton = true) {
    this.duetDatePicker.hide(moveFocusToButton);
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
  }
  handleLabelClick() {
    this.duetDatePicker.setFocus();
  }
  handleDuetChange(event) {
    event.stopPropagation();
    this.value = event.detail.value;
    this.grChange.emit({
      component: 'gr-date-picker',
      value: event.detail.value,
      valueAsDate: event.detail.valueAsDate,
    });
  }
  handleDuetFocus(event) {
    event.stopPropagation();
    this.grFocus.emit();
  }
  handleDuetBlur(event) {
    event.stopPropagation();
    this.grBlur.emit();
  }
  handleDuetOpen(event) {
    event.stopPropagation();
    this.grOpen.emit();
  }
  handleDuetClose(event) {
    event.stopPropagation();
    this.grClose.emit();
  }
  render() {
    renderHiddenInput(this.el, this.name, this.value, this.disabled);
    const helpText = this.helpText ? this.helpText : this.localization.helpText;
    return (h$1(FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, size: "medium", hasInvalidTextSlot: this.hasInvalidTextSlot, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, h$1("duet-date-picker", { ref: el => (this.duetDatePicker = el), name: this.name, disabled: this.disabled, direction: this.direction, value: this.value, min: this.min, max: this.max, firstDayOfWeek: this.firstDayOfWeek, localization: Object.assign(Object.assign({}, this.localization), { placeholder: this.placeholder }), dateAdapter: dayMonthYearAdapter, isDateDisabled: this.isDateDisabled, onDuetChange: this.handleDuetChange, onDuetFocus: this.handleDuetFocus, onDuetBlur: this.handleDuetBlur, onDuetOpen: this.handleDuetOpen, onDuetClose: this.handleDuetClose, class: {
        'date-picker-disabled': this.disabled,
        'date-picker-invalid': this.invalid,
      } })));
  }
  get el() { return getElement$1(this); }
  static get watchers() { return {
    "helpText": ["handleLabelChange"],
    "invalidText": ["handleLabelChange"],
    "label": ["handleLabelChange"]
  }; }
};
DatePicker.style = datePickerCss;

export { DatePicker as gr_date_picker };

//# sourceMappingURL=gr-date-picker.entry.js.map