import { Component, signal, ViewChild } from '@angular/core';
import { LoginFormComponent } from '../forms/login-form/login-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Utils } from '../../../utils';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from "../../../ui/error-messages/error-messages.component";
import { AuthLayoutComponent } from '../../../ui/layouts/auth-layout/auth-layout.component';

@Component({
  selector: 'app-login',
  imports: [
    AuthLayoutComponent,
    LoginFormComponent,
    ErrorMessagesComponent,
  ],
  providers: [ErrorHandlerService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild(LoginFormComponent) loginForm!: LoginFormComponent;

  isLoading = signal<boolean>(false);

  constructor(
    public readonly authService: AuthService,
    public readonly router: Router,
    public readonly errorHandler: ErrorHandlerService
  ) {
    this.login = this.login.bind(this);
  }

  async login(e: Event) {
    e.preventDefault();
    this.isLoading.set(true);
    this.errorHandler.setErrorMessages([]);
    this.loginForm.formGroup.setErrors([]);

    try {
      const loginResponse = await this.authService.login(
        JSON.stringify(this.loginForm.formGroup.getRawValue())
      )

      Utils.setSessionToken(loginResponse.token as string);
      Utils.setUser(loginResponse.data);
      this.router.navigate(['/'],{replaceUrl: true});
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
