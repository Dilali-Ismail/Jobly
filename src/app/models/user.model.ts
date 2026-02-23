export interface User{
id?: number ;
nom : string ;
presnom : string ;
email: string ;
password : string ;
}

export interface UserWithoutPassword {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
}
