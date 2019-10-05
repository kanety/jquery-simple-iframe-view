describe('jquery-simple-iframe-view', () => {
  beforeEach(() => {
    document.body.innerHTML = __html__['index.html'];
    eval($('script').text());
  });

  describe('basic', () => {
    let $elems, $container;

    beforeEach(() => {
      $elems = $('#basic').find('a[href]');
      $container = $('#basic_container');
    });

    it('shows iframe', () => {
      $elems.eq(0).click();
      expect($container.find('iframe').last().attr('src')).toEqual('iframe1.html');

      $elems.eq(1).click();
      expect($container.find('iframe').last().attr('src')).toEqual('iframe2.html');
    });
  });

  describe('callbacks', () => {
    let $elems, $container, $message;

    beforeEach((done) => {
      $elems = $('#basic').find('a[href]');
      $container = $('#basic_container');
      $message = $('#message');

      $('#basic').on('iframe:resized', done);
      $elems.eq(0).click();
    });

    it('runs callbacks', () => {
      expect($message.text()).toContain('show: iframe1.html');
      expect($message.text()).toContain('loaded: iframe1.html');
      expect($message.text()).toContain('resized: iframe1.html');
    });
  });
});
