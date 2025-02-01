import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../../shared/services/cart-state.service';
import { ProductItemCart } from '../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PasarelaComponent } from '../../models/pasarela/pasarela.component';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  style,
  transition,
  animate,
  state,
} from '@angular/animations';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    CurrencyPipe,
    RouterLink,
    PasarelaComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  animations: [
    trigger('estadoInicial', [
      state(
        'void',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
      ),
      transition(':enter', [
        animate(
          300,
          style({
            transform: 'translateX(0)',
            opacity: 1,
          }),
        ),
      ]),
    ]),
  ],
})
export default class CartComponent {
  generatePDF() {
    const data = document.getElementById('contenido-factura-pdf');
    if (data) {
      html2canvas(data)
        .then((canvas) => {
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const imgData = canvas.toDataURL('image/png');
          const doc = new jsPDF();

          doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          doc.save('boleta-de-pago.pdf');
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    } else {
      console.error('Elemento con el ID "contenido-factura" no encontrado.');
    }
  }

  paymentForm = {
    paymentType: '',
    accountType: '',
    cardNumber: '',
    ccv: '',
    firstName: '',
    lastName: '',
    email: '',
    expiryMonth: '',
    expiryYear: '',
  };

  tab1Visible = true; // Visible por defecto
  tab2Visible = false;
  tab3Visible = false;
  tab4Visible = false;

  showTab(tabNumber: number) {
    this.tab1Visible = tabNumber === 1;
    this.tab2Visible = tabNumber === 2;
    this.tab3Visible = tabNumber === 3;
    this.tab4Visible = tabNumber === 4;
  }

  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrease(product: ProductItemCart) {
    this.state.udpate({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    this.state.udpate({
      ...product,
      quantity: product.quantity - 1,
    });
  }

  canProceed(): boolean {
    return this.state.price() > 0;
  }

  onSubmit() {
    // Aquí puedes agregar la lógica para procesar el pago
    console.log('Formulario enviado', this.paymentForm);
  }
}
