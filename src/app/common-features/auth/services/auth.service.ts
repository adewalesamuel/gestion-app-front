import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { UserEntity } from '../../../common-features/user/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly TOKEN_NAME = 'utk';
  readonly USER_NAME = 'user';
  readonly ENPOINTS = {
    Login: '/login',
    Register: '/register',
    Logout: '/logout'
  };

  constructor(protected httpClient: HttpService) { }

  login(payload: any): Promise<Response<UserEntity> & Partial<{ token: string }>> {
    return this.httpClient.post(this.ENPOINTS.Login, payload)
  }

  register(payload: any): Promise<Response<UserEntity> & Partial<{ token: string }>> {
    return this.httpClient.post(this.ENPOINTS.Register, payload)
  }

  logout(): Promise<undefined> {
    return this.httpClient.post(this.ENPOINTS.Logout, '')
  }
}
