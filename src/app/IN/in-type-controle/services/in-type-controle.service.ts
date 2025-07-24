import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { INTypeControleEntity } from '../in-type-controle.entity';

@Injectable({
  providedIn: 'root'
})
export class INTypeControleService {
  readonly ENDPOINT = '/in-type-controles';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<INTypeControleEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<INTypeControleEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<INTypeControleEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<INTypeControleEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<INTypeControleEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}