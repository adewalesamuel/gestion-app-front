import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { NotificationEntity } from '../notification.entity';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly ENDPOINT = '/notifications';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<NotificationEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<NotificationEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<NotificationEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<NotificationEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<NotificationEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}