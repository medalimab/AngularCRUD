import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }
  postEmployee(data : any){
  return this.http.post<any>("http://localhost:3000/posts", data)
  .pipe(map((res:any)=>{ return res;
  }))
  }
  getEmployee(data :any){
  return this.http.get<any>("http://localhost:3000/posts")
  .pipe(map((res:any)=>{ return res;
  }))
  }
  }
