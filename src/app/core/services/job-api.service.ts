import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Job } from '../../models/job.model';


interface JobsReponse {
  data: Job[];
}

@Injectable({
  providedIn: 'root'
})
export class JobApiService {

  private url = 'https://www.arbeitnow.com/api/job-board-api';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<JobsReponse>(this.url).pipe(
      map(reponse => reponse.data)
    );
  }

  searchJobs(keyword: string, location: string): Observable<Job[]> {
    return this.getAllJobs().pipe(

      map(jobs => {

        let result = jobs;

        if (keyword && keyword.trim() !== '') {

          result = result.filter(job => job.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));

        }

        if (location && location.trim() !== '') {

          result = result.filter(job => job.location.toLocaleLowerCase().includes(location.toLocaleLowerCase()))
        }

        return result;


      })

    )
  }


}
