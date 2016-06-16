/* tslint:disable:no-unused-variable */

import {
  beforeEach,
  beforeEachProviders,
  describe,
  xdescribe,
  expect,
  it,
  xit,
  async,
  inject
} from '@angular/core/testing';
import { AppComponent } from './app.component';

beforeEachProviders(() => [AppComponent]);

describe('App: Boilerplate', () => {
  it('should create the app',
      inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'boilerplate works!\'',
      inject([AppComponent], (app: AppComponent) => {
    expect(app.title).toEqual('boilerplate works!');
  }));
});
