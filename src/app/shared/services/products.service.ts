import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { Product } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService extends BaseHttpService {
  getProducts(page: number): Observable<Product[]> {
    return this.http.get<[]>(`${this.apiUrl}/Product/get`, {
      params: {
        pageNumber: page,
      },
    });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/Product/get/${id}`);
  }
}
