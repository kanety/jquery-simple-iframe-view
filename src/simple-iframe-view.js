import $ from 'jquery';

import { NAMESPACE } from './consts';

const DEFAULTS = {
  urlSelector: 'a',
  urlAttribute: 'href',
  container: '',
  template: '<iframe scrolling="no">',
  marginHeight: 0,
  maxCache: 100,
  autoResize: true
};

export default class SimpleIframeView {
  constructor(element, options = {}) {
    this.options = $.extend({}, DEFAULTS, options);

    this.$index = $(element);
    this.$container = $(this.options.container);

    this.uid = new Date().getTime() + Math.random();
    this.namespace = `${NAMESPACE}-${this.uid}`;

    this.$current = null;
    this.cached = [];

    this.init();
  }

  init() {
    this.unbind();
    this.bind();
  }

  bind() {
    this.$index.on(`click.${this.namespace}`, this.options.urlSelector, (e) => {
      let url = $(e.currentTarget).attr(this.options.urlAttribute);
      if (url) {
        this.showUrl(url);
        e.preventDefault();
      }
    });
  }

  unbind() {
    this.$index.off(`.${this.namespace}`);
  }

  showUrl(url) {
    if (this.$current) {
      this.hide(this.$current);
    }

    let $iframe = this.findIframe(url);
    if ($iframe.length == 0) {
      $iframe = this.addIframe(url);
      this.showAndCache($iframe);
    } else {
      this.showAndCache($iframe);
      if (this.options.autoResize) {
        this.resize($iframe);
      }
    }

    return $iframe;
  }

  findIframe(url) {
    return this.$container.find('iframe').filter((i, iframe) => {
      return $(iframe).attr('src') == url
    });
  }

  addIframe(url) {
    let $iframe = $(this.options.template).attr('src', url).on('load', (e) => {
      this.loaded($(e.currentTarget));
    }).on('iframe:resize', (e) => {
      this.resize($(e.currentTarget));
    });

    this.$container.append($iframe);
    return $iframe;
  }

  showAndCache($iframe) {
    this.show($iframe);
    this.cache($iframe);
  }

  show($iframe) {
    this.$current = $iframe;
    $iframe.show();
    this.$index.trigger('iframe:show', [$iframe]);
  }

  hide($iframe) {
    $iframe.hide();
    this.$index.trigger('iframe:hide', [$iframe])
    this.$current = null;
  }

  loaded($iframe) {
    this.$index.trigger('iframe:loaded', [$iframe])

    if (this.options.autoResize) {
      this.resize($iframe);
    }
  }

  resize($iframe) {
    let iframeWindow = $iframe[0].contentWindow;
    if (!iframeWindow) return;
    let iframeDoc = iframeWindow.document;
    if (!iframeDoc || iframeDoc.readyState != 'complete') return;

    let height = iframeDoc.body.scrollHeight + this.options.marginHeight;
    $iframe.height(height);
    this.$index.trigger('iframe:resized', [$iframe])
  }

  cache($iframe) {
    this.cached.forEach(($cache, i) => {
      if ($cache.is($iframe)) {
        this.cached.splice(i, 1);
      }
    });

    this.cached.push($iframe);
    if (this.options.maxCache < this.cached.length) {
      this.cached.shift().remove();
    }
  }

  static getDefaults() {
    return DEFAULTS;
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, options);
  }
}
