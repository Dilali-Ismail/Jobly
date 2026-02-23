import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../models/job.model';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobCardComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  @Input() jobs: Job[] = [];
  @Input() isLoading: boolean = false;
}
