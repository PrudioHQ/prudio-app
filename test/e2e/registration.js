describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    browser.get('/');
    var emailField = element(by.id('email'));
    expect(emailField.getText()).toEqual('');
  });
});
