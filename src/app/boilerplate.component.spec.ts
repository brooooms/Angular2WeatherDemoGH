import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { BoilerplateAppComponent } from '../app/boilerplate.component';

beforeEachProviders(() => [BoilerplateAppComponent]);

describe('App: Boilerplate', () => {
  it('should create the app',
      inject([BoilerplateAppComponent], (app: BoilerplateAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'boilerplate works!\'',
      inject([BoilerplateAppComponent], (app: BoilerplateAppComponent) => {
    expect(app.title).toEqual('boilerplate works!');
  }));
});
