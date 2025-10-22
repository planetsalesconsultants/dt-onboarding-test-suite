/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { setPlatformHelpers } from '@stencil/core';
export const initialize = (userConfig = {}) => {
  if (typeof window === 'undefined') {
    return;
  }
  const platformHelpers = {};
  if (userConfig._ael) {
    platformHelpers.ael = userConfig._ael;
  }
  if (userConfig._rel) {
    platformHelpers.rel = userConfig._rel;
  }
  if (userConfig._ce) {
    platformHelpers.ce = userConfig._ce;
  }
  setPlatformHelpers(platformHelpers);
};
export default initialize;
//# sourceMappingURL=graphite-global.js.map
