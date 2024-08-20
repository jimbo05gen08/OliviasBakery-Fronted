import { Component, effect, inject, input } from '@angular/core';
import { ProductDetailSateService } from '../../../../shared/services/proudct-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../../shared/services/cart-state.service';
import { LoadingComponent } from '../../../../shared/loading/loading.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, LoadingComponent],
  templateUrl: './product-detail.component.html',
  providers: [ProductDetailSateService],
})
export default class ProductDetailComponent {
  productDetailState = inject(ProductDetailSateService).state;
  cartState = inject(CartStateService).state;

  id = input.required<string>();

  constructor() {
    console.log(this.productDetailState.status());
    effect(
      () => {
        this.productDetailState.getById(this.id());
        console.log(this.productDetailState.status());
      },
      { allowSignalWrites: true },
    );
  }

  addToCart() {
    this.cartState.add({
      product: this.productDetailState.product()!,
      quantity: 1,
    });
  }
}
