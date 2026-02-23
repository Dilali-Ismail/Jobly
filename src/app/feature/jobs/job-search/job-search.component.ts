import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JobApiService } from '../../../core/services/job-api.service';
import { Job } from '../../../models/job.model';
import { JobListComponent } from '../job-list/job-list.component';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JobListComponent],
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.css'
})
export class JobSearchComponent implements OnInit {

  searchForm!: FormGroup;
  allJobs: Job[] = [];
  filteredJobs: Job[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  currentPage = 1 ;
  sizePage = 10 ;

  constructor(
    private fb: FormBuilder,
    private jobService: JobApiService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keyword: [''],
      location: ['']
    });
    this.loadJobs();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.allJobs = jobs;
        this.filteredJobs = jobs;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les offres. Réessayez.';
      }
    });
  }

  get getpaginatedJobs(): Job[] {
    const start = (this.currentPage - 1) * this.sizePage;
    return this.filteredJobs.slice(start,start + this.sizePage);
  }

  onSearch(): void {
    const { keyword, location } = this.searchForm.value;
    this.isLoading = true;

    this.jobService.searchJobs(keyword || '', location || '').subscribe({
      next: (jobs) => {
        this.filteredJobs = jobs;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la recherche.';
      }
    });
    this.currentPage = 1;
  }

  onReset(): void {
    this.searchForm.reset({ keyword: '', location: '' });
    this.filteredJobs = this.allJobs;
    this.currentPage = 1;
  }
}
