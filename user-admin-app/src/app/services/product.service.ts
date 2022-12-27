import { map } from 'rxjs/operators';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   baseUrl = "http://localhost:8080/api/v1/products";


  constructor(private http:HttpClient) { }


  // getPersons():Observable<Person[]>{
  //   let head = new HttpHeaders({
  //     Authorization: sessionStorage.getItem("token").toString()
  //   });
  //  return this.http.get<Person[]>(`${this.baseUrl}/all`, {headers:head}).pipe(
  //   map(response => {
  //     return response
  //   })
  //  );
  // }

  getProducts():Observable<Product[]>{
   return this.http.get<Product[]>(`${this.baseUrl}/all`).pipe(
    map(response => {
      return response
    })
   );
  }



  saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/save`,product).pipe(
      map(response => {
        return response
      })
    );
  }



}
