import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseError } from '../../types';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Utils } from '../../utils';
import { CONSTS } from '../../constants';
import { environment } from '../../environments/environment';

@Injectable()
export class ErrorHandlerService {
  protected error!: ResponseError | HttpErrorResponse;
  errorMessages = signal<string[]>([]);

  constructor(protected router: Router) { }

  async handle() {
    if (
      'status' in this.error &&
      this.error?.status === HttpStatusCode.Unauthorized) {

      Utils.removeSessionToken();
      this.router.navigate(
        [CONSTS.ROUTES.LOGIN_ROUTE],
        {replaceUrl: true}
      );

      return;
    }

    if ('message' in this.error)
      this.setErrorMessages([this.error.message])
    if (!('messages' in this.error)) return;

    const messages = await this.error.messages as string[];
    this.setErrorMessages(messages);

    if (environment.MODE == 'development') console.log(messages);
  }

  setError(error: unknown) {
    if (!error) return;

    this.error = this.getErrorObject(error as HttpResponse<unknown>);
    this.handle();
  }

  getErrorObject<T>(response: HttpResponse<T>): ResponseError {
    return {
      status: response.status,
      messages: this.getResponseErrors(response),
    }
  }

  getResponseErrors<T>(response: HttpResponse<T> | HttpErrorResponse) {
    return new Promise((resolve, reject) => {
      let errorMessages = [];

      if (!response) reject(null);
      if (!(response instanceof HttpErrorResponse)) {
        errorMessages.push([response.statusText])
      } else {
        const {errors, message} = response.error;
        if (errors && typeof errors == 'object') {
          for (let error in errors)
            errorMessages.push(`${error}: ${errors[error]}`);
        } else {
          errorMessages.push([message ?? errors.toString()])
        }
      }

      resolve(errorMessages);
    })
  }

  setErrorMessages(messages: string[]) {
    this.errorMessages.set(messages);
  }

}
