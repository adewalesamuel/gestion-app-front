import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { ConfigSystemeEntity } from '../config-systeme.entity';

@Injectable({
  providedIn: 'root'
})
export class ConfigSystemeService {
  readonly ENDPOINT = '/config-systemes';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<ConfigSystemeEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<ConfigSystemeEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<ConfigSystemeEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<ConfigSystemeEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<ConfigSystemeEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}