import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForme! : FormGroup ;
  errorMessage : string = '';
  sucessMessage : string = '';
  isLoading : boolean = false ;

  constructor(

    private fb : FormBuilder ,
    private authservice : AuthService,
    private router : Router

  ){}

  ngOnInit(): void {

    this.registerForme = this.fb.group({

    nom : ['', [Validators.required , Validators.minLength(2)]],
    prenom : ['', [Validators.required , Validators.minLength(2)]],
    email : ['',[Validators.required , Validators.email]],
    password : ['',[Validators.required , Validators.minLength(6)]]
    });
    }

    get nom() {return this.registerForme.get('nom')}
    get prenom() {return this.registerForme.get('prenom')}
    get email() {return this.registerForme.get('email')}
    get password() {return this.registerForme.get('password')}

    onSubmit() : void {

      this.errorMessage = '';
      this.sucessMessage = '';

      if(this.registerForme.invalid){
        this.registerForme.markAllAsTouched();
        return;
      }

      this.isLoading = true ;
      const user = this.registerForme.value;

      this.authservice.register(user).subscribe({
        next : () =>{

          this.authservice.createUser(user).subscribe(
            {

              next :() =>{
                  this.isLoading = false ;
                  this.sucessMessage = 'Inscription reussi ';
                  setTimeout(() => this.router.navigate(['/login']), 2000)
              },
              error : (error) =>{

                this.isLoading = false ;
                this.errorMessage = 'Erreur de creation de compt ';
               }
              });
        },
        error : (error) =>{
          this.isLoading = false ;
          this.errorMessage = 'email already exist'
        }
      });
    }

  }
