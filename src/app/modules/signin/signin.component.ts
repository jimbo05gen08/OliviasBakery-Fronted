import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from '../../shared/services/mesagge.service';
import { User } from '../../shared/models/register-model';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export default class SigninComponent implements OnInit {
  private readonly formBuilder = new FormBuilder();
  private readonly LoginService = inject(LoginService);
  private readonly MessageService = inject(MessageService);

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value as User;
      this.LoginService.loginUser(user).subscribe((result) => {
        console.log(result);
        if (result) {
          console.log(result);
          this.MessageService.informationMessage(
            '!Bienvenido!',
            'Usuario Correcto.',
          );
        } else {
          this.MessageService.errorMessage(
            'Acceso Denegado',
            'El Usuario no Existe o la Constraseña no es correcta',
          );
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  controlHasError(controlName: string, errorType: string): boolean {
    const errors = this.loginForm.get(controlName)?.errors;

    if (errors && errors[errorType] && this.controlWasTouched(controlName))
      return true;

    return false;
  }

  controlWasTouched(controlName: string): boolean {
    return this.loginForm.get(controlName)?.touched ?? false;
  }
}
