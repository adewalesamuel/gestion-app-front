import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RCPortEntity } from '../rc-port.entity';

@Injectable({
  providedIn: 'root'
})
export class RCPortService {
  readonly ENDPOINT = '/rc-ports';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RCPortEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RCPortEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RCPortEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RCPortEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RCPortEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}