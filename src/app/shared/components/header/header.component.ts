import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  private authservice = inject(AuthService);
  private router = inject(Router);
  isLoggedIn = false ;

  ngOnInit(): void {
    this.authservice.Statut.subscribe(statut=>{
      this.isLoggedIn = statut ;
    })
  }

  logout() : void{
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

}
