# jquery-simple-iframe-view

A jquery plugin for simple iframe viewer.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-iframe-view --save

## Usage

```html
<div id="index">
  <p><a href="iframe1.html">iframe1.html</a></p>
  <p><a href="iframe2.html">iframe2.html</a></p>
  <p><a href="iframe3.html">iframe3.html</a></p>
</div>
<div id="iframes"></div>
```

```javascript
$('#iframes').simpleIframeView({
  index: '#index',
  links: 'a[href]'
});
```

### Options

```javascript
$('#iframes').simpleIframeView({
  template: '<iframe scrolling="no">',
  marginHeight: 0,
  maxCache: 100,
  autoResize: true
});
```

### Callbacks

```javascript
$('#iframes').simpleIframeView({
  ...
}).on('iframe:show', function(e, $iframe) {
  ...
}).on('iframe:hide', function(e, $iframe) {
  ...
}).on('iframe:loaded', function(e, $iframe) {
  ...
}).on('iframe:resized', function(e, $iframe) {
  ...
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
