import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { STORE_PROVIDERS /* EFFECTS_PROVIDERS */ } from './app/shared';
import { AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  /* STORE_PROVIDERS */
]);
