import { Injectable } from '@angular/core';
import swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  informationMessage(
    title?: string,
    text?: string,
  ): Promise<SweetAlertResult<unknown>> {
    return swal.fire({
      position: 'top',
      icon: 'success',
      title: title ?? 'Éxito',
      text: text ?? 'El Proceso se realizo con éxito.',
      showConfirmButton: true,
    });
  }

  errorMessage(
    title?: string,
    text?: string,
  ): Promise<SweetAlertResult<unknown>> {
    return swal.fire({
      icon: 'error',
      title: title ?? 'Error',
      text: text ?? 'El proceso no se pudo realizar!',
    });
  }

  mensajeConfirmacion(): Promise<SweetAlertResult<unknown>> {
    return swal.fire({
      title: '¡Confirmar Acción!',
      text: '!Se ejecutará la acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    });
  }
  mensajeCancelar() {
    swal
      .fire({
        title: '¡Confirmar Acción!',
        text: 'Se Eliminar todos los Cambios',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.fire({
            title: '!Cancelado!',
            icon: 'success',
          });
        }
      });
  }
  constructor() {}
}
