import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RCTypeEnginEntity } from '../rc-type-engin.entity';

@Injectable({
  providedIn: 'root'
})
export class RCTypeEnginService {
  readonly ENDPOINT = '/rc-type-engins';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RCTypeEnginEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RCTypeEnginEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RCTypeEnginEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RCTypeEnginEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RCTypeEnginEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}