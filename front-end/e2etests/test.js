/* global describe, it, browser */
const { expect } = require('chai');

describe('D8D App', () => {
  it('Should load with the right title', () => {
    browser.url('http://localhost:3000/');
    const actualTitle = browser.getTitle();

    expect(actualTitle).to.eql('D8D Starter Kit');
  });


  it('Should allow me to login', () => {
    const credentials = { username: 'admin', password: 'admin' };

    browser.url('http://localhost:3000/');
    browser.element('.username').setValue(credentials.username);
    browser.element('.password').setValue(credentials.password);
    browser.click('.submit');

    // NOTE: browser.waitUntil DOES NOT WORK...
    browser.pause(1500);
    expect(browser.getText('.add h2')).to.eql('Add');
  });
});
