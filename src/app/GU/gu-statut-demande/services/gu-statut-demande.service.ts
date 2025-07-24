import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { GUStatutDemandeEntity } from '../gu-statut-demande.entity';

@Injectable({
  providedIn: 'root'
})
export class GUStatutDemandeService {
  readonly ENDPOINT = '/gu-statut-demandes';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<GUStatutDemandeEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<GUStatutDemandeEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<GUStatutDemandeEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<GUStatutDemandeEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<GUStatutDemandeEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}