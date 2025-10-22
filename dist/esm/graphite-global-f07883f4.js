/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { s as setPlatformHelpers } from './index-e8cb22d3.js';

const initialize = (userConfig = {}) => {
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

export { initialize as i };

//# sourceMappingURL=graphite-global-f07883f4.js.map