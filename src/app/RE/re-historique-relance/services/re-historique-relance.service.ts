import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { REHistoriqueRelanceEntity } from '../re-historique-relance.entity';

@Injectable({
  providedIn: 'root'
})
export class REHistoriqueRelanceService {
  readonly ENDPOINT = '/re-historique-relances';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<REHistoriqueRelanceEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<REHistoriqueRelanceEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<REHistoriqueRelanceEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<REHistoriqueRelanceEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<REHistoriqueRelanceEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}