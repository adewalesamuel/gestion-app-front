import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RETarifEntity } from '../re-tarif.entity';

@Injectable({
  providedIn: 'root'
})
export class RETarifService {
  readonly ENDPOINT = '/re-tarifs';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RETarifEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RETarifEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RETarifEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RETarifEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RETarifEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}