import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { GUHistoriqueEntity } from '../gu-historique.entity';

@Injectable({
  providedIn: 'root'
})
export class GUHistoriqueService {
  readonly ENDPOINT = '/gu-historiques';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<GUHistoriqueEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<GUHistoriqueEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<GUHistoriqueEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<GUHistoriqueEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<GUHistoriqueEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}