import $ from 'jquery';

import SimpleIframeView from './simple-iframe-view';
import { NAMESPACE } from './consts';

$.fn.simpleIframeView = function(options) {
  return this.each((i, elem) => {
    let $elem = $(elem);
    if (!$elem.data(NAMESPACE)) {
      $elem.data(NAMESPACE, new SimpleIframeView($elem, options));
    }
  });
};

$.SimpleIframeView = SimpleIframeView;
