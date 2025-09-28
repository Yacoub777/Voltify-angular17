// voltify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iproduct } from '../interface/Iproduct';
import { Observable, map, switchMap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoltifyService {
  private apiUrl = 'http://localhost:3001/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.apiUrl);
  }

  getProductById(id: any): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${this.apiUrl}/${encodeURIComponent(id)}`);
  }

  updateProduct(id: any, product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(`${this.apiUrl}/${encodeURIComponent(id)}`, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<Iproduct> {
    return this.http.get<Iproduct[]>(this.apiUrl).pipe(
      map(products => {
        const maxId = products.length > 0 ? Math.max(...products.map(p => p.id ?? 0)) : 0;
        return { ...product, id: maxId + 1 };
      }),
      switchMap(productWithId => this.http.post<Iproduct>(this.apiUrl, productWithId))
    );
  }

  searchProducts(query: string) {
    const params = new HttpParams().set('title_like', query);
    return this.http.get<Iproduct[]>(this.apiUrl, { params });
  }
}
