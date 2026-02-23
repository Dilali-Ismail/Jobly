import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule , AsyncPipe } from '@angular/common';
import { Job } from '../../../models/job.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {selectjobsIsfavorit} from "../../../store/favorites/favorites.selectors"
import {removeFavorite,addFavorite } from "../../../store/favorites/favorites.actions"
import { take } from 'rxjs/operators';
import { ApplicationService } from '../../../core/services/application.service';
@Component({
  selector: 'app-job-card',
  imports: [CommonModule,AsyncPipe],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent implements OnInit {
  @Input() job! : Job;

  isFavourit! : Observable<boolean>

  constructor(
    private store : Store,
    private applicationService : ApplicationService
  ){}

  ngOnInit(): void {
    this.isFavourit = this.store.select(selectjobsIsfavorit(this.job.slug));
  }

  toggleFavorite(): void {
  this.isFavourit.pipe(take(1)).subscribe(isfav => {
    if (isfav) {
      this.store.dispatch(removeFavorite({ slug: this.job.slug }));
    } else {
      this.store.dispatch(addFavorite({ job: this.job }));
    }
  });
}

postuler() : void {
  this.applicationService.apply(this.job)
  .subscribe( ()=>{
    alert('Votre candidature envoyer')
  }
  );
}



}
