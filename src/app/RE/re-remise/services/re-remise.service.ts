import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RERemiseEntity } from '../re-remise.entity';

@Injectable({
  providedIn: 'root'
})
export class RERemiseService {
  readonly ENDPOINT = '/re-remises';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RERemiseEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RERemiseEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RERemiseEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RERemiseEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RERemiseEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}