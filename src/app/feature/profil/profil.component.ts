import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ReactiveFormsModule , FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {

   private authService = inject(AuthService);
   private storageService = inject(StorageService);
   private router = inject(Router);
   private fb = inject(FormBuilder)

   user: any = null;
   editMode = false;
   profileForm! : FormGroup;

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    const sessionUser = this.storageService.getUser();
    if(sessionUser){

      this.authService.getUserById(sessionUser.id)
      .subscribe( data =>{
        this.user = data ;
        this.profileForm.patchValue(data);
      });

    }

  }

  toggleEdit(){
    this.editMode = !this.editMode
  }

  saveprofil(){
       if(this.profileForm.valid){
        this.authService.updateUser(this.user.id,this.profileForm.value)
        .subscribe(updated=>{
          this.user = updated ;
          this.editMode =false ;
          alert('Profil mise a jour');
        })
       }

  }

  deletAccount(){
    if(confirm("Supprimer definitivement ")){
      this.authService.deletAccount(this.user.id)
      .subscribe(()=>{
        this.authService.logout();
        this.router.navigate(['/login']);
      })
    }

    }


}
