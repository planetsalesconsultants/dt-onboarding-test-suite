/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
//
// Returns an element's offset relative to its parent. Similar to element.offsetTop and element.offsetLeft, except the
// parent doesn't have to be positioned relative or absolute.
//
// NOTE: This was created to work around what appears to be a bug in Chrome where a slotted element's offsetParent
// seems to ignore elements inside the surrounding shadow DOM: https://bugs.chromium.org/p/chromium/issues/detail?id=920069
//
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}

//
// Scrolls an element into view of its container. If the element is already in view, nothing will happen.
//
function scrollIntoView(element, container, direction = 'vertical', behavior = 'smooth') {
  const offset = getOffset(element, container);
  const offsetTop = offset.top + container.scrollTop;
  const offsetLeft = offset.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction === 'horizontal' || direction === 'both') {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    }
    else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction === 'vertical' || direction === 'both') {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    }
    else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}

export { scrollIntoView as s };

//# sourceMappingURL=scroll-30882dab.js.map