import { Component, inject } from '@angular/core';
import { ProductsSateService } from '../../../../shared/services/products-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CartStateService } from '../../../../shared/services/cart-state.service';
import { Product } from '../../../../shared/interfaces/product.interface';
import { LoadingComponent } from '../../../../shared/loading/loading.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, LoadingComponent],
  templateUrl: './product-list.component.html',
  providers: [ProductsSateService],
})
export default class ProductListComponent {
  productsState = inject(ProductsSateService);
  cartState = inject(CartStateService).state;

  changePage() {
    const page = this.productsState.state.page() + 1;
    this.productsState.changePage$.next(page);
  }

  addToCart(product: Product) {
    this.cartState.add({
      product,
      quantity: 1,
    });
  }
}
