/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2e762384.js');
const scroll = require('./scroll-81cf7b2d.js');
const slot = require('./slot-31942376.js');
const formControl = require('./form-control-8f3f59cd.js');
const helpers = require('./helpers-637c6824.js');

function isTabbable(el) {
  const tabIndex = el.tabIndex;
  return tabIndex > -1;
}
function getNearestTabbableElement(el) {
  // Check the element
  if (isTabbable(el)) {
    return el;
  }
  // Check the element's shadow root
  if (el.shadowRoot) {
    const tabbableShadowChild = [...el.shadowRoot.children].find(isTabbable);
    if (tabbableShadowChild) {
      return tabbableShadowChild;
    }
  }
  // Check the element's children
  if (el.children) {
    return [...el.children].map(getNearestTabbableElement)[0];
  }
  return null;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


const applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
    // Fallback to 1 in case both values are `0`

    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }

    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }

  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


const arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


const eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


const flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


const hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

//
class Popover {
  constructor(anchor, popover, options) {
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.anchor = anchor;
    this.popover = popover;
    this.options = Object.assign({
      skidding: 0,
      distance: 0,
      placement: 'bottom-start',
      strategy: 'absolute',
      transitionElement: this.popover,
      visibleClass: 'popover-visible',
      onAfterShow: () => { },
      onAfterHide: () => { },
      onTransitionEnd: () => { }
    }, options);
    this.isVisible = false;
    this.popover.hidden = true;
    this.popover.classList.remove(this.options.visibleClass);
    this.popover.addEventListener('transitionend', this.handleTransitionEnd);
  }
  handleTransitionEnd(event) {
    const target = event.target;
    // Make sure the transition event originates from from the correct element, and not one that has bubbled up
    if (target === this.options.transitionElement) {
      // This is called before the element is hidden so users can do things like reset scroll. It will fire once for
      // every transition property. Use `event.propertyName` to determine which property has finished transitioning.
      this.options.onTransitionEnd.call(this, event);
      // Make sure we only do this once, since transitionend will fire for every transition
      if (!this.isVisible && !this.popover.hidden) {
        this.popover.hidden = true;
        this.popover.classList.remove(this.options.visibleClass);
        this.options.onAfterHide.call(this);
      }
    }
  }
  destroy() {
    this.popover.removeEventListener('transitionend', this.handleTransitionEnd);
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }
  show() {
    this.isVisible = true;
    this.popover.hidden = false;
    requestAnimationFrame(() => this.popover.classList.add(this.options.visibleClass));
    if (this.popper) {
      this.popper.destroy();
    }
    this.popper = createPopper(this.anchor, this.popover, {
      placement: this.options.placement,
      strategy: this.options.strategy,
      modifiers: [
        {
          name: 'flip',
          options: {
            boundary: 'viewport'
          }
        },
        {
          name: 'offset',
          options: {
            offset: [this.options.skidding, this.options.distance]
          }
        }
      ]
    });
    this.popover.addEventListener('transitionend', () => this.options.onAfterShow.call(this), { once: true });
    // Reposition the menu after it appears in case a modifier kicked in
    requestAnimationFrame(() => this.popper.update());
  }
  hide() {
    // Apply the hidden styles and wait for the transition before hiding completely
    this.isVisible = false;
    this.popover.classList.remove(this.options.visibleClass);
  }
  setOptions(options) {
    this.options = Object.assign(this.options, options);
    this.isVisible
      ? this.popover.classList.add(this.options.visibleClass)
      : this.popover.classList.remove(this.options.visibleClass);
    // Update popper options
    if (this.popper) {
      this.popper.setOptions({
        placement: this.options.placement,
        strategy: this.options.strategy
      });
      requestAnimationFrame(() => this.popper.update());
    }
  }
}

const dropdownCss = ".gr-scroll-lock{overflow:hidden !important}:host{--panel-background-color:var(--gr-color-white);--panel-border-radius:var(--gr-border-radius-medium);--panel-border-color:var(--gr-panel-border-color);--panel-box-shadow:var(--gr-shadow-large);--transition:150ms opacity, 150ms transform;display:inline-block;position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.dropdown-trigger{display:block}.dropdown-positioner{position:absolute;z-index:var(--gr-z-index-dropdown)}.dropdown-panel{max-height:50vh;font-family:var(--gr-font-family);font-size:var(--gr-font-size-medium);font-weight:var(--gr-font-weight-normal);background-color:var(--panel-background-color);border:solid 1px var(--panel-border-color);border-radius:var(--panel-border-radius);box-shadow:var(--panel-box-shadow);opacity:0;overflow:auto;overscroll-behavior:none;pointer-events:none;transform:scale(0.9);transition:var(--transition)}.dropdown-positioner[data-popper-placement^=top] .dropdown-panel{transform-origin:bottom}.dropdown-positioner[data-popper-placement^=bottom] .dropdown-panel{transform-origin:top}.dropdown-positioner[data-popper-placement^=left] .dropdown-panel{transform-origin:right}.dropdown-positioner[data-popper-placement^=right] .dropdown-panel{transform-origin:left}.dropdown-positioner.popover-visible .dropdown-panel{opacity:1;transform:none;pointer-events:all}";

let id$1 = 0;
const Dropdown = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.grShow = index.createEvent(this, "gr-show", 7);
    this.grAfterShow = index.createEvent(this, "gr-after-show", 7);
    this.grHide = index.createEvent(this, "gr-hide", 7);
    this.grAfterHide = index.createEvent(this, "gr-after-hide", 7);
    this.componentId = `dropdown-${++id$1}`;
    this.isVisible = false;
    this.open = false;
    this.placement = 'bottom-start';
    this.closeOnSelect = true;
    this.containingElement = undefined;
    this.distance = 2;
    this.skidding = 0;
    this.hoist = false;
  }
  handleOpenChange() {
    this.open ? this.show() : this.hide();
    this.updateAccessibleTrigger();
  }
  handlePopoverOptionsChange() {
    this.popoverElement.setOptions({
      strategy: this.hoist ? 'fixed' : 'absolute',
      placement: this.placement,
      distance: this.distance,
      skidding: this.skidding,
    });
  }
  connectedCallback() {
    if (!this.containingElement) {
      this.containingElement = this.el;
    }
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
    this.handleTriggerKeyUp = this.handleTriggerKeyUp.bind(this);
    this.handleTriggerSlotChange = this.handleTriggerSlotChange.bind(this);
  }
  componentDidLoad() {
    this.popoverElement = new Popover(this.trigger, this.positioner, {
      strategy: this.hoist ? 'fixed' : 'absolute',
      placement: this.placement,
      distance: this.distance,
      skidding: this.skidding,
      transitionElement: this.panel,
      onAfterHide: () => this.grAfterHide.emit(),
      onAfterShow: () => this.grAfterShow.emit(),
      onTransitionEnd: () => {
        if (!this.open) {
          this.panel.scrollTop = 0;
        }
      },
    });
    // Show on init if open
    if (this.open) {
      this.show();
    }
  }
  disconnectedCallback() {
    this.hide();
    if (this.popoverElement) {
      this.popoverElement.destroy();
    }
  }
  /** Shows the dropdown panel */
  async show() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (this.isVisible) {
      return;
    }
    const grShow = this.grShow.emit();
    if (grShow.defaultPrevented) {
      this.open = false;
      return;
    }
    this.panel.addEventListener('gr-activate', this.handleMenuItemActivate);
    this.panel.addEventListener('gr-select', this.handlePanelSelect);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    this.isVisible = true;
    this.open = true;
    this.popoverElement.show();
  }
  /** Hides the dropdown panel */
  async hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.isVisible) {
      return;
    }
    const grHide = this.grHide.emit();
    if (grHide.defaultPrevented) {
      this.open = true;
      return;
    }
    this.panel.removeEventListener('gr-activate', this.handleMenuItemActivate);
    this.panel.removeEventListener('gr-select', this.handlePanelSelect);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    this.isVisible = false;
    this.open = false;
    this.popoverElement.hide();
  }
  /** Sets focus on the trigger. */
  async focusOnTrigger() {
    const slot = this.trigger.querySelector('slot');
    const trigger = slot.assignedElements({ flatten: true })[0];
    if (trigger) {
      if (typeof trigger.setFocus === 'function') {
        trigger.setFocus();
      }
      else if (typeof trigger.focus === 'function') {
        trigger.focus();
      }
    }
  }
  getMenu() {
    return this.panel
      .querySelector('slot')
      .assignedElements({ flatten: true })
      .filter(el => el.tagName.toLowerCase() === 'gr-menu')[0];
  }
  handleDocumentKeyDown(event) {
    var _a;
    // Close when escape is pressed
    if (event.key === 'Escape') {
      this.hide();
      this.focusOnTrigger();
      return;
    }
    // Handle tabbing
    if (event.key === 'Tab') {
      // Tabbing within an open menu should close the dropdown and refocus the trigger
      if (this.open && ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === 'gr-menu-item') {
        event.preventDefault();
        this.hide();
        this.focusOnTrigger();
        return;
      }
      // Tabbing outside of the containing element closes the panel
      //
      // If the dropdown is used within a shadow DOM, we need to obtain the activeElement within that shadowRoot,
      // otherwise `document.activeElement` will only return the name of the parent shadow DOM element.
      setTimeout(() => {
        var _a;
        const activeElement = this.containingElement.getRootNode() instanceof ShadowRoot
          ? (_a = document.activeElement.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement
          : document.activeElement;
        if ((activeElement === null || activeElement === void 0 ? void 0 : activeElement.closest(this.containingElement.tagName.toLowerCase())) !== this.containingElement) {
          this.hide();
          return;
        }
      });
    }
  }
  handleDocumentMouseDown(event) {
    // Close when clicking outside of the containing element
    const path = event.composedPath();
    if (!path.includes(this.containingElement)) {
      this.hide();
      return;
    }
  }
  handleMenuItemActivate(event) {
    const item = event.target;
    scroll.scrollIntoView(item, this.panel);
  }
  handlePanelSelect(event) {
    const target = event.target;
    // Hide the dropdown when a menu item is selected
    if (this.closeOnSelect && target.tagName.toLowerCase() === 'gr-menu') {
      this.hide();
      this.focusOnTrigger();
    }
  }
  handleTriggerClick() {
    this.open ? this.hide() : this.show();
  }
  handleTriggerKeyDown(event) {
    const menu = this.getMenu();
    const menuItems = menu ? [...menu.querySelectorAll('gr-menu-item')] : null;
    const firstMenuItem = menuItems[0];
    const lastMenuItem = menuItems[menuItems.length - 1];
    // Close when escape or tab is pressed
    if (event.key === 'Escape') {
      this.focusOnTrigger();
      this.hide();
      return;
    }
    // When spacebar/enter is pressed, show the panel but don't focus on the menu. This let's the user press the same
    // key again to hide the menu in case they don't want to make a selection.
    if ([' ', 'Enter'].includes(event.key)) {
      event.preventDefault();
      this.open ? this.hide() : this.show();
      return;
    }
    // When up/down is pressed, we make the assumption that the user is familiar with the menu and plans to make a
    // selection. Rather than toggle the panel, we focus on the menu (if one exists) and activate the first item for
    // faster navigation.
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      // Show the menu if it's not already open
      if (!this.open) {
        this.show();
      }
      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstMenuItem) {
        firstMenuItem.setFocus();
        return;
      }
      if (event.key === 'ArrowUp' && lastMenuItem) {
        lastMenuItem.setFocus();
        return;
      }
    }
    // Other keys bring focus to the menu and initiate type-to-select behavior
    const ignoredKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt'];
    if (this.open && menu && !ignoredKeys.includes(event.key)) {
      menu.typeToSelect(event.key);
      return;
    }
  }
  handleTriggerKeyUp(event) {
    // Prevent space from triggering a click event in Firefox
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
  handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }
  //
  // Slotted triggers can be arbitrary content, but we need to link them to the dropdown panel with `aria-haspopup` and
  // `aria-expanded`. These must be applied to the "accessible trigger" (the tabbable portion of the trigger element
  // that gets slotted in) so screen readers will understand them. The accessible trigger could be the slotted element,
  // a child of the slotted element, or an element in the slotted element's shadow root.
  //
  // For example, the accessible trigger of an <gr-button> is a <button> located inside its shadow root.
  //
  // To determine this, we assume the first tabbable element in the trigger slot is the "accessible trigger."
  //
  updateAccessibleTrigger() {
    const slot = this.trigger.querySelector('slot');
    const assignedElements = slot.assignedElements({ flatten: true });
    const accessibleTrigger = assignedElements.map(getNearestTabbableElement)[0];
    if (accessibleTrigger) {
      accessibleTrigger.setAttribute('aria-haspopup', 'true');
      accessibleTrigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    }
  }
  render() {
    return (index.h(index.Host, { id: this.componentId, class: {
        'dropdown-open': this.open,
      } }, index.h("span", { class: "dropdown-trigger", ref: el => (this.trigger = el), onClick: this.handleTriggerClick, onKeyDown: this.handleTriggerKeyDown, onKeyUp: this.handleTriggerKeyUp }, index.h("slot", { name: "trigger", onSlotchange: this.handleTriggerSlotChange })), index.h("div", { ref: el => (this.positioner = el), class: "dropdown-positioner" }, index.h("div", { ref: el => (this.panel = el), class: "dropdown-panel", role: "menu", "aria-hidden": this.open ? 'false' : 'true', "aria-labelledby": this.componentId }, index.h("slot", null)))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChange"],
    "distance": ["handlePopoverOptionsChange"],
    "hoist": ["handlePopoverOptionsChange"],
    "placement": ["handlePopoverOptionsChange"],
    "skidding": ["handlePopoverOptionsChange"]
  }; }
};
Dropdown.style = dropdownCss;

const menuCss = ".gr-scroll-lock{overflow:hidden !important}:host{--padding-top:var(--gr-spacing-x-small);--padding-bottom:var(--gr-spacing-x-small);display:block;padding-top:var(--padding-top);padding-left:0;padding-right:0;padding-bottom:var(--padding-bottom);box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host:focus{outline:none}";

const Menu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.grSelect = index.createEvent(this, "gr-select", 7);
    this.typeToSelectString = '';
  }
  connectedCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  /**
   * Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.
   * The key passed will be appended to the internal query and the selection will be updated. After a brief period, the
   * internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for
   * enabling type-to-select when the menu doesn't have focus.
   */
  async typeToSelect(key) {
    clearTimeout(this.typeToSelectTimeout);
    this.typeToSelectTimeout = setTimeout(() => (this.typeToSelectString = ''), 750);
    this.typeToSelectString += key.toLowerCase();
    const items = this.getItems();
    for (const item of items) {
      const slot$1 = item.shadowRoot.querySelector('slot:not([name])');
      const label = slot.getTextContent(slot$1).toLowerCase().trim();
      if (label.substring(0, this.typeToSelectString.length) === this.typeToSelectString) {
        item.setFocus();
        break;
      }
    }
  }
  getItems() {
    const slot = this.menu.querySelector('slot');
    return [...slot.assignedElements({ flatten: true })].filter((el) => el.tagName.toLowerCase() === 'gr-menu-item' && !el.disabled);
  }
  getActiveItem() {
    return this.getItems().find(i => i === document.activeElement);
  }
  setActiveItem(item) {
    item.setFocus();
  }
  handleClick(event) {
    const target = event.target;
    const item = target.closest('gr-menu-item');
    if (item && !item.disabled) {
      this.grSelect.emit({ item });
    }
  }
  handleKeyDown(event) {
    // Make a selection when pressing enter
    if (event.key === 'Enter') {
      const item = this.getActiveItem();
      event.preventDefault();
      if (item) {
        this.grSelect.emit({ item });
      }
    }
    // Prevent scrolling when space is pressed
    if (event.key === ' ') {
      event.preventDefault();
    }
    // Move the selection when pressing down or up
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const items = this.getItems();
      const selectedItem = this.getActiveItem();
      let index = items.indexOf(selectedItem);
      if (items.length) {
        event.preventDefault();
        if (event.key === 'ArrowDown') {
          index++;
        }
        else if (event.key === 'ArrowUp') {
          index--;
        }
        else if (event.key === 'Home') {
          index = 0;
        }
        else if (event.key === 'End') {
          index = items.length - 1;
        }
        if (index < 0)
          index = 0;
        if (index > items.length - 1)
          index = items.length - 1;
        this.setActiveItem(items[index]);
        return;
      }
    }
    this.typeToSelect(event.key);
  }
  render() {
    return (index.h("div", { ref: el => (this.menu = el), class: "menu", role: "menu", onClick: this.handleClick, onKeyDown: this.handleKeyDown }, index.h("slot", null)));
  }
};
Menu.style = menuCss;

const menuDividerCss = ".gr-scroll-lock{overflow:hidden !important}:host{--margin-top:var(--gr-spacing-x-small);--margin-bottom:var(--gr-spacing-x-small);--border-color:var(--gr-panel-border-color);display:block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.menu-divider{border-top:solid 1px var(--border-color);margin-top:var(--margin-top);margin-left:0;margin-right:0;margin-bottom:var(--margin-bottom)}";

const MenuDivider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "menu-divider", role: "separator", "aria-hidden": "true" })));
  }
};
MenuDivider.style = menuDividerCss;

const menuItemCss = ".gr-scroll-lock{overflow:hidden !important}:host{--line-height:var(--gr-line-height-normal);--background-color:transparent;--background-color-focused:var(--gr-color-primary);--color:var(--gr-color-dark);--color-focused:var(--gr-color-primary-contrast);--color-disabled:var(--gr-color-medium);--padding-top:var(--gr-spacing-xx-small);--padding-start:var(--gr-spacing-x-large);--padding-end:var(--gr-spacing-x-large);--padding-bottom:var(--gr-spacing-xx-small);--transition:background-color 150ms linear, color 150ms linear;position:relative;display:flex;align-items:stretch;font-family:var(--gr-font-family);font-size:var(--gr-font-size-medium);font-weight:var(--gr-font-weight-normal);line-height:var(--line-height);letter-spacing:var(--gr-letter-spacing-normal);text-align:left;background-color:var(--background-color);color:var(--color);padding-top:var(--padding-top);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:var(--padding-bottom);transition:var(--transition);user-select:none;white-space:nowrap;cursor:pointer;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host(.menu-item-focused:not(.menu-item-disabled)){outline:none;background-color:var(--background-color-focused);color:var(--color-focused)}:host(.menu-item-disabled){outline:none;color:var(--color-disabled);cursor:not-allowed}.checkmark{display:flex;position:absolute;left:0.5em;top:calc(50% - 0.5em);visibility:hidden;align-items:center;font-size:inherit}.checkmark svg{display:inline-block;width:1.1em;height:1.1em;contain:strict;fill:currentcolor;box-sizing:content-box !important}:host(.menu-item-checked) .checkmark{visibility:visible}.label{flex:1 1 auto}.start{flex:0 0 auto;display:flex;align-items:center}.start ::slotted(:last-child){margin-right:0.5em}.end{flex:0 0 auto;display:flex;align-items:center}.end ::slotted(:first-child){margin-left:0.5em}";

const MenuItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hasFocus = false;
    this.checked = false;
    this.value = '';
    this.disabled = false;
  }
  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  /** Sets focus on the menu item. */
  async setFocus(options) {
    this.el.focus(options);
  }
  /** Removes focus from the menu item. */
  async removeFocus() {
    this.el.blur();
  }
  handleBlur() {
    this.hasFocus = false;
  }
  handleFocus() {
    this.hasFocus = true;
  }
  handleMouseEnter() {
    this.setFocus();
  }
  handleMouseLeave() {
    this.removeFocus();
  }
  render() {
    return (index.h(index.Host, { class: {
        'menu-item-checked': this.checked,
        'menu-item-disabled': this.disabled,
        'menu-item-focused': this.hasFocus,
      }, role: "menuitem", "aria-disabled": this.disabled ? 'true' : 'false', "aria-checked": this.checked ? 'true' : 'false', tabIndex: !this.disabled ? 0 : null, onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, index.h("span", { class: "checkmark" }, index.h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, index.h("title", null, "Checkmark"), index.h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M416 128L192 384l-96-96" }))), index.h("span", { class: "start" }, index.h("slot", { name: "start" })), index.h("span", { class: "label" }, index.h("slot", null)), index.h("span", { class: "end" }, index.h("slot", { name: "end" }))));
  }
  get el() { return index.getElement(this); }
};
MenuItem.style = menuItemCss;

const menuLabelCss = ".gr-scroll-lock{overflow:hidden !important}:host{--font-style:normal;--font-weight:var(--gr-font-weight-normal);--line-height:var(--gr-line-height-normal);--background-color:transparent;--color:var(--gr-color-medium-tint);--padding-top:var(--gr-spacing-xx-small);--padding-start:var(--gr-spacing-x-large);--padding-end:var(--gr-spacing-x-large);--padding-bottom:var(--gr-spacing-xx-small);display:block;font-family:var(--gr-font-family);font-size:var(--gr-font-size-small);font-weight:var(--font-weight);font-style:var(--font-style);line-height:var(--line-height);letter-spacing:var(--gr-letter-spacing-normal);color:var(--color);padding-top:var(--padding-top);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:var(--padding-bottom);user-select:none;text-align:left;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}";

const MenuLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
};
MenuLabel.style = menuLabelCss;

const HTMLElementSSR = (typeof HTMLElement !== 'undefined' ? HTMLElement : class {
});

const selectCss = ".form-control .form-control-label{display:none}.form-control .form-control-help-text{display:none}.form-control .form-control-invalid-text{display:none}.form-control-has-label .form-control-label{display:flex;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-label-color);margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-label.form-control-small .form-control-label{font-size:var(--gr-form-element-label-font-size-small)}.form-control-has-label.form-control-medium .form-control-label{font-size:var(--gr-form-element-label-font-size-medium)}.form-control-has-label.form-control-large .form-control-label{font-size:var(--gr-form-element-label-font-size-large)}.form-control-has-label .form-control-label .asterisk{margin-left:var(--gr-spacing-x-small);color:var(--gr-color-medium)}.form-control-has-label .form-control-label .asterisk svg{width:0.6em;height:0.6em;margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-help-text .form-control-help-text{display:block;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-help-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-help-text.form-control-small .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-small);min-height:1.625rem}.form-control-has-help-text.form-control-medium .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-medium);min-height:1.875rem}.form-control-has-help-text.form-control-large .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-large);min-height:2.125rem}.form-control-has-invalid-text .form-control-invalid-text{display:flex;margin-left:-2px;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-invalid-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon{margin-top:var(--gr-spacing-xxx-small);margin-right:var(--gr-spacing-xx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon svg{width:1.4em;height:1.4em}.form-control-has-invalid-text.form-control-small .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-small);min-height:1.625rem}.form-control-has-invalid-text.form-control-medium .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-medium);min-height:1.875rem}.form-control-has-invalid-text.form-control-large .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-large);min-height:2.125rem}.gr-scroll-lock{overflow:hidden !important}:host{--font-size:var(--gr-form-element-font-size-medium);--font-weight:var(--gr-font-weight-normal);--background-color:var(--gr-color-white);--background-color-hover:var(--gr-color-white);--background-color-focus:var(--gr-color-white);--background-color-invalid:var(--gr-color-white);--background-color-invalid-hover:var(--gr-color-white);--border-radius:var(--gr-form-element-border-radius-small);--border-color:var(--gr-color-light-shade);--border-color-hover:var(--gr-color-medium);--border-color-focus:var(--gr-color-primary);--border-color-invalid:var(--gr-color-danger);--border-color-invalid-hover:var(--gr-color-danger-shade);--color:var(--gr-color-dark-tint);--placeholder-color:var(--gr-color-medium-tint);--min-height:var(--gr-form-element-height-medium);--label-margin-start:var(--gr-spacing-medium);--label-margin-end:var(--gr-spacing-medium);--clear-icon-margin-end:var(--gr-spacing-medium);--caret-margin-end:var(--gr-spacing-medium);--tags-padding-top:3px;--tags-padding-bottom:3px;--tags-margin-end:var(--gr-spacing-xx-small);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);display:block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.select-small{--font-size:var(--gr-form-element-font-size-small);--min-height:var(--gr-form-element-height-small);--label-margin-start:var(--gr-spacing-small);--label-margin-end:var(--gr-spacing-small);--clear-icon-margin-end:var(--gr-spacing-small);--caret-margin-end:var(--gr-spacing-small);--tags-padding-top:2px;--tags-padding-bottom:2px}.select-large{--font-size:var(--gr-form-element-font-size-large);--min-height:var(--gr-form-element-height-large);--label-margin-start:var(--gr-spacing-large);--label-margin-end:var(--gr-spacing-large);--clear-icon-margin-end:var(--gr-spacing-large);--caret-margin-end:var(--gr-spacing-large);--tags-padding-top:4px;--tags-padding-bottom:4px}.select{display:block}.select-box{display:inline-flex;align-items:center;justify-content:start;position:relative;width:100%;font-family:var(--gr-font-family);font-size:var(--font-size);font-weight:var(--font-weight);letter-spacing:normal;background-color:var(--background-color);border:solid 1px var(--border-color);border-radius:var(--border-radius);min-height:var(--min-height);color:var(--color);vertical-align:middle;overflow:hidden;transition:150ms color, 150ms border, 150ms box-shadow;cursor:pointer}.select.select-invalid:not(.select-disabled) .select-box{background-color:var(--background-color-invalid);border-color:var(--border-color-invalid)}.select.select-invalid:not(.select-disabled):not(.select-focused) .select-box:hover{background-color:var(--background-color-invalid-hover);border-color:var(--border-color-invalid-hover)}.select.select-invalid:not(.select-disabled) .select-box{background-color:var(--background-color-invalid);border-color:var(--border-color-invalid)}.select:not(.select-disabled) .select-box:hover{background-color:var(--background-color-hover);border-color:var(--border-color-hover)}.select.select-focused:not(.select-disabled) .select-box{outline:none;box-shadow:var(--focus-ring);border-color:var(--border-color-focus);background-color:var(--background-color-focus)}.select-disabled .select-box{opacity:0.5;cursor:not-allowed;outline:none}.select-disabled .select-tags,.select-disabled .select-clear{pointer-events:none}.select-label{flex:1 1 auto;display:flex;align-items:center;user-select:none;margin-top:0;margin-left:var(--label-margin-start);margin-right:var(--label-margin-end);margin-bottom:0;scrollbar-width:none;-ms-overflow-style:none;overflow-x:auto;overflow-y:hidden;white-space:nowrap}.select-label::-webkit-scrollbar{width:0;height:0}.select-has-tags .select-label{margin-left:0}.select-clear{display:inline-flex;align-items:center;font-size:inherit;color:var(--gr-color-medium);border:none;background:none;padding:0;transition:150ms color;cursor:pointer;margin-right:var(--clear-icon-margin-end)}.select-clear:hover{color:var(--gr-color-dark)}.select-clear:focus{outline:none}.select-clear svg{width:1.2em;height:1.2em;font-size:var(--font-size)}.caret{flex:0 0 auto;display:inline-flex;transition:250ms transform ease;margin-right:var(--caret-margin-end)}.caret svg{width:1em;height:1em;font-size:var(--font-size)}.select-open .caret{transform:rotate(-180deg)}.select-placeholder-visible .select-label{color:var(--placeholder-color)}.select-tags{display:inline-flex;align-items:center;flex-wrap:wrap;justify-content:left;margin-left:var(--gr-spacing-xx-small);padding-bottom:var(--tags-padding-bottom)}.select-tags gr-tag{padding-top:var(--tags-padding-top)}.select-tags gr-tag:not(:last-of-type){margin-right:var(--tags-margin-end)}.select-hidden-select{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;position:absolute;top:0;left:0;width:100%;height:100%}.select-pill .select-box{border-radius:var(--min-height)}";

let id = 0;
const Select = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.grChange = index.createEvent(this, "gr-change", 7);
    this.grFocus = index.createEvent(this, "gr-focus", 7);
    this.grBlur = index.createEvent(this, "gr-blur", 7);
    this.inputId = `select-${++id}`;
    this.labelId = `select-label-${id}`;
    this.helpTextId = `select-help-text-${id}`;
    this.invalidTextId = `select-invalid-text-${id}`;
    this.inheritedAttributes = {};
    this.handleBlur = () => {
      // Don't blur if the control is open. We'll move focus back once it closes.
      if (!this.isOpen) {
        this.hasFocus = false;
        this.grBlur.emit();
      }
    };
    this.handleFocus = () => {
      if (!this.hasFocus) {
        this.hasFocus = true;
        this.grFocus.emit();
      }
    };
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasInvalidTextSlot = false;
    this.hasLabelSlot = false;
    this.isOpen = false;
    this.items = [];
    this.displayLabel = '';
    this.displayTags = [];
    this.multiple = false;
    this.maxTagsVisible = 3;
    this.disabled = false;
    this.name = '';
    this.placeholder = '';
    this.size = 'medium';
    this.hoist = false;
    this.value = '';
    this.pill = false;
    this.label = '';
    this.requiredIndicator = false;
    this.helpText = '';
    this.invalidText = '';
    this.invalid = false;
    this.clearable = false;
  }
  handleDisabledChange() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }
  }
  handleLabelChange() {
    this.handleSlotChange();
  }
  handleMultipleChange() {
    // Cast to array | string based on `this.multiple`
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] || '';
    this.syncItemsFromValue();
  }
  handleValueChange() {
    this.syncItemsFromValue();
    this.grChange.emit();
  }
  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
    this.handleMenuShow = this.handleMenuShow.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleTagInteraction = this.handleTagInteraction.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }
  componentWillLoad() {
    this.handleSlotChange();
    this.inheritedAttributes = helpers.inheritAttributes(this.el, ['aria-label']);
  }
  componentDidLoad() {
    {
      this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    }
    this.reportDuplicateItemValues();
    // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
    requestAnimationFrame(() => this.syncItemsFromValue());
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  /** Sets focus on the select. */
  async setFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
    this.dropdown.focusOnTrigger();
  }
  getItemLabel(item) {
    const slot$1 = item.shadowRoot.querySelector('slot:not([name])');
    return slot.getTextContent(slot$1);
  }
  getItems() {
    return [...this.el.querySelectorAll('gr-menu-item')];
  }
  getValueAsArray() {
    return Array.isArray(this.value) ? this.value : [this.value];
  }
  handleClearClick(event) {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    this.syncItemsFromValue();
  }
  handleKeyDown(event) {
    const target = event.target;
    const items = this.getItems();
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    // Ignore key presses on tags
    if (target.tagName.toLowerCase() === 'gr-tag') {
      return;
    }
    // Tabbing out of the control closes it
    if (event.key === 'Tab') {
      if (this.isOpen) {
        this.dropdown.hide();
      }
      return;
    }
    // Up/down opens the menu
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      // Show the menu if it's not already open
      if (!this.isOpen) {
        this.dropdown.show();
      }
      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstItem) {
        firstItem.setFocus();
        return;
      }
      if (event.key === 'ArrowUp' && lastItem) {
        lastItem.setFocus();
        return;
      }
    }
    // All other "printable" keys open the menu and initiate type to select
    if (!this.isOpen && event.key.length === 1) {
      event.stopPropagation();
      event.preventDefault();
      this.dropdown.show();
      this.menu.typeToSelect(event.key);
    }
  }
  handleLabelClick() {
    this.box.focus();
  }
  handleMenuSelect(event) {
    const item = event.detail.item;
    if (this.multiple) {
      this.value = this.value.includes(item.value)
        ? this.value.filter(v => v !== item.value)
        : [...this.value, item.value];
    }
    else {
      this.value = item.value;
    }
    this.syncItemsFromValue();
  }
  handleMenuShow(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.resizeMenu();
    this.resizeObserver.observe(this.el);
    this.isOpen = true;
  }
  handleMenuHide() {
    this.resizeObserver.unobserve(this.el);
    this.isOpen = false;
    // Restore focus on the box after the menu is hidden
    this.box.focus();
  }
  handleSlotChange() {
    this.hasHelpTextSlot = slot.hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = slot.hasSlot(this.el, 'invalid-text');
    this.hasLabelSlot = slot.hasSlot(this.el, 'label');
    this.syncItemsFromValue();
    this.reportDuplicateItemValues();
  }
  handleTagInteraction(event) {
    // Don't toggle the menu when a tag's clear button is activated
    const path = event.composedPath();
    const clearButton = path.find(el => {
      if (el instanceof HTMLElementSSR) {
        return el.classList.contains('tag-clear');
      }
    });
    if (clearButton) {
      event.stopPropagation();
    }
  }
  reportDuplicateItemValues() {
    const items = this.getItems();
    // Report duplicate values since they can break selection logic
    const duplicateValues = items.map(item => item.value).filter((e, i, a) => a.indexOf(e) !== i);
    if (duplicateValues.length) {
      throw new Error('Duplicate value found on <gr-menu-item> in <gr-select>: "' + duplicateValues.join('", "') + '"');
    }
  }
  resizeMenu() {
    this.menu.style.width = `${this.box.clientWidth}px`;
  }
  syncItemsFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();
    // Sync checked states
    items.map(item => (item.checked = value.includes(item.value)));
    // Sync display label
    if (this.multiple) {
      const checkedItems = [];
      value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));
      this.displayTags = checkedItems.map(item => {
        return (index.h("gr-tag", { type: "info", size: this.size, pill: this.pill, clearable: true, onClick: this.handleTagInteraction, onKeyDown: this.handleTagInteraction, "onGr-clear": event => {
            event.stopPropagation();
            if (!this.disabled) {
              item.checked = false;
              this.syncValueFromItems();
            }
          } }, this.getItemLabel(item)));
      });
      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayLabel = '';
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(index.h("gr-tag", { type: "info", size: this.size, pill: this.pill }, "+", total - this.maxTagsVisible));
      }
    }
    else {
      const checkedItem = items.filter(item => item.value === value[0])[0];
      this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : '';
      this.displayTags = [];
    }
  }
  syncValueFromItems() {
    const items = this.getItems();
    const checkedItems = items.filter(item => item.checked);
    const checkedValues = checkedItems.map(item => item.value);
    if (this.multiple) {
      this.value = this.value.filter(val => checkedValues.includes(val));
    }
    else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : '';
    }
  }
  render() {
    var _a;
    const hasSelection = this.multiple ? this.value.length > 0 : this.value !== '';
    const ariaLabelAttributes = this.inheritedAttributes['aria-label']
      ? { 'aria-label': this.inheritedAttributes['aria-label'] }
      : { 'aria-labelledby': this.labelId };
    helpers.renderHiddenInput(this.el, this.name, parseValue(this.value), this.disabled);
    return (index.h(formControl.FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: this.helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, hasInvalidTextSlot: this.hasInvalidTextSlot, size: this.size, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, index.h("gr-dropdown", { ref: el => (this.dropdown = el), hoist: this.hoist, closeOnSelect: !this.multiple, containingElement: this.el, class: {
        'select': true,
        'select-open': this.isOpen,
        'select-empty': ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) === 0,
        'select-focused': this.hasFocus,
        'select-clearable': this.clearable,
        'select-disabled': this.disabled,
        'select-multiple': this.multiple,
        'select-has-tags': this.multiple && hasSelection,
        'select-placeholder-visible': this.displayLabel === '',
        [`select-${this.size}`]: true,
        'select-pill': this.pill,
        'select-invalid': this.invalid,
      }, "onGr-show": this.handleMenuShow, "onGr-hide": this.handleMenuHide }, index.h("div", Object.assign({ slot: "trigger", ref: el => (this.box = el), id: this.inputId, class: "select-box", role: "combobox" }, ariaLabelAttributes, { "aria-describedby": this.invalid ? this.invalidTextId : this.helpTextId, "aria-haspopup": "true", "aria-expanded": this.isOpen ? 'true' : 'false', "aria-invalid": this.invalid ? 'true' : 'false', "aria-required": this.requiredIndicator ? 'true' : 'false', tabIndex: this.disabled ? -1 : 0, onBlur: this.handleBlur, onFocus: this.handleFocus, onKeyDown: this.handleKeyDown }), index.h("div", { class: "select-label" }, this.displayTags.length ? (index.h("span", { class: "select-tags" }, this.displayTags)) : (this.displayLabel || this.placeholder)), this.clearable && hasSelection && (index.h("button", { class: "select-clear", type: "button", onClick: this.handleClearClick, "aria-label": "clear", tabindex: "-1" }, index.h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, index.h("title", null, "Close Circle"), index.h("path", { d: "M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }), index.h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M320 320L192 192M192 320l128-128" })))), index.h("span", { class: "caret" }, index.h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, index.h("title", null, "Chevron Down"), index.h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "48", d: "M112 184l144 144 144-144" }))), index.h("input", { class: "select-hidden-select", "aria-hidden": "true", value: hasSelection ? '1' : '', tabIndex: -1 })), index.h("gr-menu", { ref: el => (this.menu = el), class: "select-menu", "onGr-select": this.handleMenuSelect }, index.h("slot", { onSlotchange: this.handleSlotChange })))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["handleDisabledChange"],
    "helpText": ["handleLabelChange"],
    "invalidText": ["handleLabelChange"],
    "label": ["handleLabelChange"],
    "multiple": ["handleMultipleChange"],
    "value": ["handleValueChange"]
  }; }
};
const parseValue = (value) => {
  if (value == null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.join(',');
  }
  return value.toString();
};
Select.style = selectCss;

const tagCss = ":host{--height:calc(var(--gr-form-element-height-medium) * 0.8);--line-height:calc(var(--gr-form-element-height-medium) - 1px * 2);--border-radius:var(--gr-form-element-border-radius-medium);--border-width:1px;--border-style:solid;--padding-top:0;--padding-start:var(--gr-spacing-small);--padding-end:var(--gr-spacing-small);--padding-bottom:0;--font-size:var(--gr-form-element-font-size-medium);--background-color:rgba(var(--gr-color-primary-rgb), 0.05);--border-color:rgba(var(--gr-color-primary-rgb), 0.2);--color:var(--gr-color-primary-shade);--clear-color:var(--gr-color-primary);--clear-color-hover:var(--gr-color-primary-shade);--clear-margin-left:var(--gr-spacing-xx-small);--clear-margin-right:calc(-1 * var(--gr-spacing-xxx-small));display:inline-block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host(.tag-success){--background-color:rgba(var(--gr-color-success-rgb), 0.05);--border-color:rgba(var(--gr-color-success-rgb), 0.2);--color:var(--gr-color-success-shade);--clear-color:var(--gr-color-success);--clear-color-hover:var(--gr-color-success-shade)}:host(.tag-info){--background-color:rgba(var(--gr-color-medium-rgb), 0.05);--border-color:rgba(var(--gr-color-medium-rgb), 0.2);--color:var(--gr-color-medium-shade);--clear-color:var(--gr-color-medium);--clear-color-hover:var(--gr-color-medium-shade)}:host(.tag-warning){--background-color:rgba(var(--gr-color-warning-rgb), 0.05);--border-color:rgba(var(--gr-color-warning-rgb), 0.2);--color:var(--gr-color-warning-shade);--clear-color:var(--gr-color-warning);--clear-color-hover:var(--gr-color-warning-shade)}:host(.tag-danger){--background-color:rgba(var(--gr-color-danger-rgb), 0.05);--border-color:rgba(var(--gr-color-danger-rgb), 0.2);--color:var(--gr-color-danger-shade);--clear-color:var(--gr-color-danger);--clear-color-hover:var(--gr-color-danger-shade)}:host(.tag-small){--font-size:var(--gr-form-element-font-size-small);--height:calc(var(--gr-form-element-height-small) * 0.8);--line-height:calc(var(--gr-form-element-height-small) - 1px * 2);--border-radius:var(--gr-form-element-border-radius-small);--padding-start:var(--gr-spacing-x-small);--padding-end:var(--gr-spacing-x-small);--clear-margin-left:var(--gr-spacing-xx-small);--clear-margin-right:calc(-1 * var(--gr-spacing-xxx-small))}:host(.tag-large){--font-size:var(--gr-form-element-font-size-large);--height:calc(var(--gr-form-element-height-large) * 0.8);--line-height:calc(var(--gr-form-element-height-large) - 1px * 2);--border-radius:var(--gr-form-element-border-radius-large);--padding:0 var(--gr-spacing-medium);--clear-margin-left:var(--gr-spacing-xx-small);--clear-margin-right:calc(-1 * var(--gr-spacing-x-small))}.tag{display:flex;align-items:center;border-style:var(--border-style);border-width:var(--border-width);border-radius:var(--border-radius);white-space:nowrap;user-select:none;cursor:default;font-family:var(--gr-font-family);font-size:var(--font-size);font-weight:var(--gr-font-weight-normal);height:var(--height);line-height:var(--line-height);padding-top:var(--padding-top);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:var(--padding-bottom);background-color:var(--background-color);border-color:var(--border-color);color:var(--color)}.tag-clear{--color:var(--clear-color);--color-hover:var(--clear-color-hover);--padding-start:0;--padding-end:0;margin-left:var(--clear-margin-left);margin-right:var(--clear-margin-right);--height:1em}.tag-clear svg{font-size:0.7em}.tag-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tag-clear svg{width:1.1em;height:1.1em}:host(.tag-pill) .tag{border-radius:var(--height)}";

const Tag = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.grClear = index.createEvent(this, "gr-clear", 7);
    this.type = 'primary';
    this.size = 'medium';
    this.pill = false;
    this.clearable = false;
    this.truncate = false;
    this.title = '';
  }
  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
  }
  handleClearClick() {
    this.grClear.emit();
  }
  render() {
    return (index.h(index.Host, { class: {
        [`tag-${this.type}`]: true,
        [`tag-${this.size}`]: true,
        'tag-pill': this.pill,
        'tag-clearable': this.clearable,
      } }, index.h("span", { class: "tag" }, index.h("span", { class: { 'tag-truncate': this.truncate }, title: this.title }, index.h("slot", null)), this.clearable && (index.h("gr-button", { variant: "plain", size: this.size, class: "tag-clear", "aria-label": "clear", onClick: this.handleClearClick }, index.h("svg", { slot: "icon-only", role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, index.h("title", null, "Close"), index.h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M368 368L144 144M368 144L144 368" })))))));
  }
};
Tag.style = tagCss;

exports.gr_dropdown = Dropdown;
exports.gr_menu = Menu;
exports.gr_menu_divider = MenuDivider;
exports.gr_menu_item = MenuItem;
exports.gr_menu_label = MenuLabel;
exports.gr_select = Select;
exports.gr_tag = Tag;

//# sourceMappingURL=gr-dropdown_7.cjs.entry.js.map