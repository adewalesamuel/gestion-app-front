import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RERelanceEntity } from '../re-relance.entity';

@Injectable({
  providedIn: 'root'
})
export class RERelanceService {
  readonly ENDPOINT = '/re-relances';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RERelanceEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RERelanceEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RERelanceEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RERelanceEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RERelanceEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}