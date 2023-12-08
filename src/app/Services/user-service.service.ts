import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../Model/iuser';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiService } from './api.service';
import { ResponseApi } from '../Response/response';
import { ResponseDEl } from '../Response/resonseDel';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private apiService : ApiService) { }
  
  getAllUsers():Observable<IUser[]>{
    return this.apiService.getAll<IUser[]>(`users`); //?limit=0&skip=0
  }
  
  getUserById(userId :number):Observable<IUser>{
    return this.apiService.getById<IUser>(`users/${userId}`);
  }
  addUser(user : IUser):Observable<IUser>{
    return this.apiService.add<IUser>(`users`,user);
  }
  updateUser(user : IUser):Observable<IUser>{
    return this.apiService.update<IUser>(`users/${user.id}`,user);
  }

  deleteUser(id : number):Observable<any>{
    return this.apiService.Delete(`users/${id}`) ;
  }

  onResponseSuccess(title :string, body : string){
    this.apiService.onResponseSuccess(title , body);
  }

  onResponsefaild(error : any){
    this.apiService.onResponsefaild(error);
  }
}
