import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApplicationService } from '../../core/services/application.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-application-list',
  imports: [CommonModule],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css'
})
export class ApplicationListComponent implements OnInit {

  private applicationService = inject(ApplicationService);

 applications! : Observable<any[]>

  ngOnInit(): void {
    this.applications = this.applicationService.getMyApplications();
  }

  removeApp(id:any){
    if(confirm('Voules vous supprimer cette candidature ?')){
      this.applicationService.deleteApplication(id).subscribe(()=>{
            this.applications = this.applicationService.getMyApplications();
      });
    }
  }

  OnStatusChange(event : any , id : any){
    const newStatus = event.target.value ;
    this.applicationService.updateStatus(id,newStatus)
    .subscribe( () =>{
       this.applications = this.applicationService.getMyApplications();
       alert("status bien changé")
    })
  }
}
