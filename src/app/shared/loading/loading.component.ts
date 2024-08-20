import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `<div class="overlay">
    <div>
      <img src="../../../assets/images/olivias-bakery-favicon.png" alt="" />
    </div>
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div> `,
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {}
