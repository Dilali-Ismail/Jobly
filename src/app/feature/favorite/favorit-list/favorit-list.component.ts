import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {Job} from "../../../models/job.model"
import { Store } from '@ngrx/store';
import {loadFavorites } from "../../../store/favorites/favorites.actions";
import {selectAllfavorites} from "../../../store/favorites/favorites.selectors"
import { JobCardComponent } from '../../jobs/job-card/job-card.component';
@Component({
  selector: 'app-favorit-list',
  imports: [CommonModule,JobCardComponent],
  templateUrl: './favorit-list.component.html',
  styleUrl: './favorit-list.component.css'
})
export class FavoritListComponent implements OnInit {

  favorites! :Observable<Job[]>;

  constructor(
    private store : Store
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadFavorites());
    this.favorites = this.store.select(selectAllfavorites)
  }

}
