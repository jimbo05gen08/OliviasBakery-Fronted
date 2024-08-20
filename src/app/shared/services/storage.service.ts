import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductItemCart } from '../interfaces/product.interface';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorage: Storage | undefined;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = this.document.defaultView?.localStorage;
    if (!this.localStorage) return;
  }

  loadProducts(): Observable<ProductItemCart[]> {
    const rawProducts = this.localStorage?.getItem('products');

    return of(rawProducts ? JSON.parse(rawProducts) : []);
  }

  saveProducts(products: ProductItemCart[]): void {
    this.localStorage?.setItem('products', JSON.stringify(products));
  }
}
