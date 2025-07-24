import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Utils } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly HOST = 'http://127.0.0.1';
  readonly PORT = '8000';
  readonly URL = environment.APP_HOST_URL ?? `${this.HOST}:${this.PORT}`;
  readonly ROOT_PATH  = '/api';

  hasPendingRequest = false;

  setHasPendingRequest(bool: boolean) {
    this.hasPendingRequest = bool;
  }

  constructor(protected httpClient: HttpClient) { }

  getHeaders(): HttpHeaders {
    return (
      new HttpHeaders({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Authorization': `Bearer ${Utils.getSessionToken()}`
      })
    );
  }
  getFormDataHeaders(): HttpHeaders {
    return (
      new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${Utils.getSessionToken()}`
      })
    );
  }

  getAll<T>(endpoint: string): Promise<T> {
    this.setHasPendingRequest(true);
    return new Promise((resolve, reject) => {
      this.httpClient.get<T>(`${this.URL}${this.ROOT_PATH}${endpoint}`,
        {
          headers: this.getHeaders(),
          observe: 'response',
        }
      )
      .subscribe({
        next: response => {
          this.setHasPendingRequest(false);
          if (!response.ok) return reject(response);
          return resolve(response.body as T);
        },
        error: error => {
          this.setHasPendingRequest(false);
          return reject(error)
        }
      })
    })
  }

  get<T>(endpoint: string): Promise<T> {
    this.setHasPendingRequest(true);
    return new Promise((resolve, reject) => {
      this.httpClient.get<T>(`${this.URL}${this.ROOT_PATH}${endpoint}`,
        {
          headers: this.getHeaders(),
          observe: 'response',
        }
      )
      .subscribe({
        next: response => {
          this.setHasPendingRequest(false);
          if (!response.ok) return reject(response);
          return resolve(response.body as T);
        },
        error: error => {
          this.setHasPendingRequest(false);
          return reject(error)
        }
      })
    })
  }

  post<T>(endpoint: string, payload: any): Promise<T> {
    this.setHasPendingRequest(true);
    return new Promise((resolve, reject) => {
      this.httpClient.post<T>(`${this.URL}${this.ROOT_PATH}${endpoint}`,
        payload,
        {
          headers: this.getHeaders(),
          observe: 'response',
        }
      )
      .subscribe({
        next: response => {
          this.setHasPendingRequest(false);
          if (!response.ok) return reject(response);
          return resolve(response.body as T);
        },
        error: error => {
          this.setHasPendingRequest(false);
          return reject(error)
        }
      })
    })
  }

  postFormData<T>(endpoint: string, payload: any): Promise<T>  {
    return new Promise((resolve, reject) => {
      this.httpClient.post<T>(`${this.URL}${this.ROOT_PATH}${endpoint}`,
        payload,
        {
          headers: this.getHeaders(),
          observe: 'response',
        }
      )
      .subscribe({
        next: response => {
          this.setHasPendingRequest(false);
          if (!response.ok) return reject(response);
          return resolve(response.body as T);
        },
        error: error => {
          this.setHasPendingRequest(false);
          return reject(error)
        }
      })
    })
  }

  put<T>(endpoint: string, payload: any): Promise<T> {
    this.setHasPendingRequest(true);
    return new Promise((resolve, reject) => {
      this.httpClient.put<T>(`${this.URL}${this.ROOT_PATH}${endpoint}`,
        payload,
        {
          headers: this.getHeaders(),
          observe: 'response',
        }
      )
      .subscribe({
        next: response => {
          this.setHasPendingRequest(false);
          if (!response.ok) return reject(response);
          return resolve(response.body as T);
        },
        error: error => {
          this.setHasPendingRequest(false);
          return reject(error)
        }
      })
    })
  }

  erase<T>(endpoint: string): Promise<T> {
    this.setHasPendingRequest(true);
    return new Promise((resolve, reject) => {
      this.httpClient.delete<T>(`${this.URL}${this.ROOT_PATH}${endpoint}`,
        {
          headers: this.getHeaders(),
          observe: 'response',
        }
      )
      .subscribe({
        next: response => {
          this.setHasPendingRequest(false);
          if (!response.ok) return reject(response);
          return resolve(response.body as T);
        },
        error: error => {
          this.setHasPendingRequest(false);
          return reject(error)
        }
      })
    })
  }
}
