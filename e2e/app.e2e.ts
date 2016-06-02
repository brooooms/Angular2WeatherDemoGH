import { BoilerplatePage } from './app.po';

describe('boilerplate App', function() {
  let page: BoilerplatePage;

  beforeEach(() => {
    page = new BoilerplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('boilerplate works!');
  });
});
