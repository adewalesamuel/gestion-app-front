import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RCPaysEntity } from '../rc-pays.entity';

@Injectable({
  providedIn: 'root'
})
export class RCPaysService {
  readonly ENDPOINT = '/rc-payss';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RCPaysEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RCPaysEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RCPaysEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RCPaysEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RCPaysEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}