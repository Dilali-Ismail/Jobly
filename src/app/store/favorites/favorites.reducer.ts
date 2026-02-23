import { createReducer, on } from "@ngrx/store";
import { Job } from "../../models/job.model";
import { addFavorite, removeFavorite, loadFavoritesSuccess } from "../favorites/favorites.actions"


export interface FavoriteState {
  jobs: Job[],
  isloading: boolean,
  error: string
}

export const initialState: FavoriteState = {
  jobs: [],
  isloading: false,
  error: ''
}

export const FavouriteReducer = createReducer(
  initialState,

  on(addFavorite, (state, { job }) => {

    const alreadyExist = state.jobs.some(j => j.slug == job.slug);

    if (alreadyExist) return state;

    return {
      ...state, jobs: [...state.jobs, job]
    }

  }),

  on(removeFavorite, (state, { slug }) => {
    return {
      ...state,
      jobs: state.jobs.filter(j => j.slug != slug)
    }
  }),

  on(loadFavoritesSuccess, (state, { JobsList }) => ({

    ...state,
    jobs :JobsList,
    isloading: false

  }))

)


