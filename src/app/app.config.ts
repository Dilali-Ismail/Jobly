import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FavouriteReducer } from './store/favorites/favorites.reducer';
import { provideEffects } from '@ngrx/effects';
import { FavoritesEffects } from './store/favorites/favorites.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ favourites: FavouriteReducer }),
    provideEffects([FavoritesEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};
