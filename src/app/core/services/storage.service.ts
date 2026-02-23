import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly user_key =  "jobfinder_user";
  constructor() { }

  saveUser(user : any) : void{
    localStorage.setItem(this.user_key,JSON.stringify(user));
  }

  getUser() : any{
    const user = localStorage.getItem(this.user_key);
    return user? JSON.parse(user) : null ;
  }

  removeUser(){
    localStorage.removeItem(this.user_key);
  }

  isLoggedIn() : boolean{
    return this.getUser() !== null ;
  }

}
