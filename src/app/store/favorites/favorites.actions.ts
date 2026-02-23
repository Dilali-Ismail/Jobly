import { createAction, props } from "@ngrx/store";
import { Job } from "../../models/job.model";

export const addFavorite = createAction(
  'Add Favorite',
  props<{ job: Job }>()
)

export const removeFavorite = createAction(
  'Remove Favorite',
  props<{ slug: string }>()
)

export const loadFavorites = createAction(
  'load favorites '
)

export const loadFavoritesSuccess = createAction(
  'load favorites with success ',
  props<{ JobsList: Job[] }>()
)

export const loadFavoritesError = createAction(
  'load favorites Failure ',
  props<{ error: string }>()
)
