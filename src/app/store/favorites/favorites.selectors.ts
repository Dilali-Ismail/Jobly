import { createFeatureSelector, createSelector } from "@ngrx/store";
import {FavoriteState} from "./favorites.reducer"

const selectfavouritState = createFeatureSelector<FavoriteState>('favourites');


export const selectAllfavorites = createSelector(
  selectfavouritState,
  (state) => state.jobs
);

export const selectNumberOfJobs = createSelector(
  selectAllfavorites ,
  (jobs) => jobs.length
);

export const selectjobsIsfavorit = (slug : string)=> createSelector(
  selectAllfavorites ,
  (jobs) => jobs.some(j=> j.slug === slug)
);


