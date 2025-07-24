import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { GUDemandeEntity } from '../gu-demande.entity';

@Injectable({
  providedIn: 'root'
})
export class GUDemandeService {
  readonly ENDPOINT = '/gu-demandes';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<GUDemandeEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<GUDemandeEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<GUDemandeEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<GUDemandeEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<GUDemandeEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}