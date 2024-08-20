import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { LoadingService } from '../../shared/services/loading.service';
import { CartStateService } from '../../shared/services/cart-state.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoadingComponent, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export default class LayoutComponent {
  cartState = inject(CartStateService).state;
  private loadingService: LoadingService = inject(LoadingService);
  loading = this.loadingService.isLoading;
}
