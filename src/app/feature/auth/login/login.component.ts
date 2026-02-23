import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule , FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

loginForm! : FormGroup ;
errorMessage : string = '';
successMessage : String = '';
isloading : boolean = false ;

constructor(

  private fb : FormBuilder ,
  private authService : AuthService ,
  private router : Router
){}

ngOnInit(): void {

  this.loginForm = this.fb.group(
    {

      email : ['', [Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(6)]]
    }
  );
}

get email(){return this.loginForm.get('email')}
get password(){return this.loginForm.get('password')}

onSubmit() : void {

  this.errorMessage = '';

  if(this.loginForm.invalid){

    this.loginForm.markAllAsTouched();
    return ;
  }

  this.isloading = true
  const {email, password} = this.loginForm.value ;

  this.authService.login(email , password).subscribe({

    next :() =>{

      this.isloading = false ;
      this.router.navigate(['/jobs'])

    },
    error : (error) =>{

         this.isloading = false ;
         this.errorMessage = error.message || 'une errur esr survenue';
    }


  }
  )


}


}
