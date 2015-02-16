describe('Registration', function() {
  var fnameField, lnameField, emailField, passwordField;

  beforeEach(function() {
    fnameField = element(by.id('name'));
    lnameField = element(by.id('lname'));
    emailField = element(by.id('email'));
    passwordField = element(by.id('password'));
  });

  it('page fields should be empty', function() {
    browser.get('/#/register');

    expect(fnameField.getText()).toEqual('');
    expect(lnameField.getText()).toEqual('');
    expect(passwordField.getText()).toEqual('');
    expect(emailField.getText()).toEqual('');
  });

  it('should require all fields to be filled', function(){
    fnameField.sendKeys('Doe');

    element(by.name('button')).click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/register/);
    fnameField.clear();
  });

  it('should create a new user', function(){
    fnameField.sendKeys("Johnny");
    lnameField.sendKeys("Does");
    emailField.sendKeys("johnnydoes@doedoes.com");
    passwordField.sendKeys("doespassword");

    element(by.name('button')).click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/login/);
  });
});

describe('Login', function(){
  var emailField, passwordField;

  beforeEach(function() {
    emailField = element(by.id('email'));
    passwordField = element(by.id('password'));
  });

  it('page fields should be empty', function() {
    browser.get('/#/login');

    expect(passwordField.getText()).toEqual('');
    expect(emailField.getText()).toEqual('');
  });

  it('should require all fields to be filled', function(){
    element(by.name('button')).click();

    var errorMsg = element(by.css('.text-danger'));
    expect(errorMsg.getText()).toBe('Wrong email/password.');
  });

  it('should succeed with valid credentials', function(){
    emailField.sendKeys("johnnydoes@doedoes.com");
    passwordField.sendKeys("doespassword");

    element(by.name('button')).click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\//);
    expect(element(by.css('.page')).getText()).toBe("Dashboard");
  })
});
