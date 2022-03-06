import { Injectable, } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map} from 'rxjs/operators'
const myheaderr={
  headers:new HttpHeaders({
  'Accept':'application/JSON',
  'Content-Type':'application/JSON',
  Authorization:'Bearer cf3785111ac04464e85909d820b46d874fb1a55b29f2e97ca0b9519847f25658'
})
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http :HttpClient) { }

  postEmployee(data : any){
    return this.http.post<any>("https://gorest.co.in/public/v2/users/", data ,myheaderr)
    .pipe(map((res:any)=>{
      return res;
    }))
  
}
getEmployee(){
  return this.http.get<any>("https://gorest.co.in/public/v2/users")
  .pipe(map((res:any)=>{
    return res;
  }))
}

deleteEmployee(id:number){
  return this.http.delete<any>("https://gorest.co.in/public/v2/users/"+id ,myheaderr)
  .pipe(map((res:any)=>{
    return res;
  }))
}

updateEmployee(data:any,id:number){
  return this.http.put<any>("https://gorest.co.in/public/v2/users/" +id,data, myheaderr)
  .pipe(map((res:any)=>{
    return res;
  }))
}
}