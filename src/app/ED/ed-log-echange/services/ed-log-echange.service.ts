import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { EDLogEchangeEntity } from '../ed-log-echange.entity';

@Injectable({
  providedIn: 'root'
})
export class EDLogEchangeService {
  readonly ENDPOINT = '/ed-log-echanges';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<EDLogEchangeEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<EDLogEchangeEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<EDLogEchangeEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<EDLogEchangeEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<EDLogEchangeEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}