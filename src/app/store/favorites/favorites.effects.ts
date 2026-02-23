import { HttpClient } from "@angular/common/http";
import { Injectable , inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addFavorite, removeFavorite, loadFavorites, loadFavoritesSuccess, loadFavoritesError } from "./favorites.actions"
import { catchError, mergeMap, map, merge } from "rxjs";
import { of } from 'rxjs';

@Injectable()
export class FavoritesEffects {

  private apiUrl = 'http://localhost:3000/favoriteOffers';

 private actions = inject(Actions);
private http = inject(HttpClient);

  addFavorite = createEffect(() =>
    this.actions.pipe(
      ofType(addFavorite),
      mergeMap(({ job }) =>
        this.http.get<any[]>(`${this.apiUrl}?slug=${job.slug}`)
       .pipe(
        mergeMap(existing=> existing.length=== 0?this.http.post(this.apiUrl,{...job,id :job.slug}):of(null))
       )
      )
    ),
    { dispatch: false }
  );

  removeFavorite = createEffect(() =>
    this.actions.pipe(
      ofType(removeFavorite),
      mergeMap(({ slug }) =>
        this.http.delete(`${this.apiUrl}/${slug}`)
      .pipe(catchError(() => of(null)))
      )),
    { dispatch: false }
  );

  loadfavorites = createEffect(() =>
    this.actions.pipe(
      ofType(loadFavorites),
      mergeMap(() =>
        this.http.get<any[]>(this.apiUrl).pipe(
          map(JobsList => loadFavoritesSuccess({ JobsList })),
          catchError(error => of(loadFavoritesError({ error: error.message })))
        )
      )
    )
  );
}
