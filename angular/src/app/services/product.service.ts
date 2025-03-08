import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  constructor( private httpClient: HttpClient) { }

  getProductList(theCategoryId: number):Observable<Product[]>{
    // update the url based on the category:
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

// Helper interface: unwraps the JSON from spring data Rest _embedded entry.
interface GetResponse {
  _embedded:{
    products: Product[];
  }
}
