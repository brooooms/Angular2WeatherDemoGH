export class BoilerplatePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('boilerplate-app h1')).getText();
  }
}
