import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { GUTypeDemandeEntity } from '../gu-type-demande.entity';

@Injectable({
  providedIn: 'root'
})
export class GUTypeDemandeService {
  readonly ENDPOINT = '/gu-type-demandes';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<GUTypeDemandeEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<GUTypeDemandeEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<GUTypeDemandeEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<GUTypeDemandeEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<GUTypeDemandeEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}