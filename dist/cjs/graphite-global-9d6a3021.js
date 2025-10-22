/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
'use strict';

const index = require('./index-2e762384.js');

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
  index.setPlatformHelpers(platformHelpers);
};

exports.initialize = initialize;

//# sourceMappingURL=graphite-global-9d6a3021.js.map