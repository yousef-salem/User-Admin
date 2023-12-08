import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ResponseApi } from '../Response/response';
import { ResponseDEl } from '../Response/resonseDel';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions ;
  constructor(private httpClient : HttpClient , private  toastr : ToastrService) {
    this.httpOptions =  {
      headers :  new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  } ;
   }
  
  getAll<T>(endPoint:string):Observable<T>{
    return this.httpClient.get<T>(`${environment.APIURL}/${endPoint}`);
    }
  
    getById<T>(endPoint:string):Observable<T>{
      return this.httpClient.get<T>(`${environment.APIURL}/${endPoint}`);
    }
    add<T>(endPoint:string , body :any){
      return this.httpClient.post<T>(`${environment.APIURL}/${endPoint}` , body ,this.httpOptions);
    }

    update<T>(endPoint:string , body :any ){
      return this.httpClient.put<T>(`${environment.APIURL}/${endPoint}` , body ,this.httpOptions);
    }

    Delete(endPoint:string):Observable<any>{
      return this.httpClient.delete<any>(`${environment.APIURL}/${endPoint}`);
    }
    onResponseSuccess(Title :string, body : string){
      this.toastr.success(body, Title, { timeOut: 2000 });
    }
    onResponsefaild(error : any){
      this.toastr.error(error, 'Error', { timeOut: 4000 });
        console.log(error); 
    }
}
