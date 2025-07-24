import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RCHistoriqueProprieteEntity } from '../rc-historique-propriete.entity';

@Injectable({
  providedIn: 'root'
})
export class RCHistoriqueProprieteService {
  readonly ENDPOINT = '/rc-historique-proprietes';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RCHistoriqueProprieteEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RCHistoriqueProprieteEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RCHistoriqueProprieteEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RCHistoriqueProprieteEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RCHistoriqueProprieteEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}