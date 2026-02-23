import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private url = 'http://localhost:3000/applications';

  apply(job : any) : Observable<any>{
    const user = this.storageService.getUser();
    const applyto = {
      userId : user.id,
      job : job ,
      appliedDate : new Date().toDateString(),
      status :'en attente'
    }
    return this.http.post(this.url, applyto)
  }

  getMyApplications() : Observable<any[]>{
    const user = this.storageService.getUser();
    return this.http.get<any[]>(`${this.url}?userId=${user.id}`);
  }

  deleteApplication(id : any) : Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  updateStatus(id : any , newStatus : string) : Observable<any>{
    return this.http.patch(`${this.url}/${id}`, {status : newStatus})
  }

}
