import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { User, UserWithoutPassword } from '../../models/user.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  private apiurl = 'http://localhost:3000/users';
  private authStatut = new BehaviorSubject<boolean>(this.storageService.isLoggedIn())

  Statut = this.authStatut.asObservable();

  register(user: User): Observable<User> {

    return this.http.get<any[]>(`${this.apiurl}?email=${user.email}`)
      .pipe(map(users => {
        if (users.length > 0) {
          throw new Error('email deja exist')
        }
        return user
      }),

        catchError(error => throwError(() => error))

      );

  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiurl, user)
  }


  login(email: string, password: string): Observable<any> {

    return this.http.get<any[]>(`${this.apiurl}?email=${email}`)
      .pipe(
        map(users => {
          if (users.length === 0) {
            throw new Error("Email ou mot de pass incorrect");
          }
          const user = users[0];

          if (user.password != password) {
            throw new Error("Email ou mot de pass incorrect")
          }

          const UserWithoutPassword = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
          };

          this.storageService.saveUser(UserWithoutPassword);
          this.authStatut.next(true);
          return UserWithoutPassword;

        }),

        catchError(error => throwError(() => error))
      );
  }

  logout(): void {
    this.storageService.removeUser();
    this.authStatut.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.storageService.isLoggedIn();
  }


  getCurrentUser(): any {
    return this.storageService.getUser();
  }

  getUserById(id :any) : Observable<any> {
    return this.http.get(`${this.apiurl}/${id}`)
  }


  updateUser(id:number | string , data :any) : Observable<any>{

    return this.http.patch<any>(`${this.apiurl}/${id}`,data).pipe(
      map(updateUser=>{

         const {password,...userWithoutPass} = updateUser ;
         this.storageService.saveUser(updateUser);
         this.authStatut.next(true);
         return updateUser
      })
    );
  }

  deletAccount(id : any) : Observable<any>{
    return this.http.delete(`${this.apiurl}/${id}`);
  }







}
