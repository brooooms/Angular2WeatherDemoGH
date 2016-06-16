import { provideStore } from '@ngrx/store';
import reducers from '../commons/reducers';

export const STORE_PROVIDERS = provideStore(reducers);
