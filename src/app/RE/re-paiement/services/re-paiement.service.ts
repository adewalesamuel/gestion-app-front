import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { REPaiementEntity } from '../re-paiement.entity';

@Injectable({
  providedIn: 'root'
})
export class REPaiementService {
  readonly ENDPOINT = '/re-paiements';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<REPaiementEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<REPaiementEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<REPaiementEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<REPaiementEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<REPaiementEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}