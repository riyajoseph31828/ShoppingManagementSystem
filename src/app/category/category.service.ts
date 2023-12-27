import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from './category';
import { Observable } from 'rxjs';

@Injectable({   //using this we can inject it to various constructors
  providedIn: 'root'
})
export class CategoryService {
  //https://localhost:7223/api/
  //apiUrl = environment.baseApiUrl + 'categories';

  apiUrl=`${environment.baseApiUrl}categories`;

  constructor(private client: HttpClient) { }

  getList(): Observable<Category[]> {
    return this.client.get<Category[]>(this.apiUrl);
  }

  add(cat:Category):Observable<Category>{
    return this.client.post<Category>(this.apiUrl, cat)

  }

  getById(id:number):Observable<Category>{
    return this.client.get<Category>(this.apiUrl + '/'+id);
  }
  
  update(c:Category):Observable<void>{
    return this.client.put<void>(this.apiUrl + '/'+ c.id,c);
  }

}
