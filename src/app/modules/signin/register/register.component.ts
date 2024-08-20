import { Component, inject, OnInit } from '@angular/core';
import { RegisterService } from '../../../shared/services/register.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../shared/models/register-model';
import { MessageService } from '../../../shared/services/mesagge.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit {
  private readonly formBuilder = new FormBuilder();
  private readonly registerService = inject(RegisterService);
  private readonly MessageService = inject(MessageService);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  saveUser() {
    if (this.registerForm.valid) {
      this.MessageService.mensajeConfirmacion().then((result) => {
        if (result.isConfirmed) {
          const user = this.registerForm.value as User;
          this.registerService.saveUser(user).subscribe((result) => {
            if (result) {
              this.MessageService.informationMessage(
                '!Realizado!',
                'Se Guardó con éxito.',
              );
            } else {
              this.MessageService.errorMessage;
            }
          });
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  controlHasError(controlName: string, errorType: string): boolean {
    const control = this.registerForm.get(controlName);
    if (control) {
      if (controlName == 'email') {
        console.log(control.errors);
      }

      return control.errors?.[errorType] && control.touched;
    }
    return false;
  }
}
