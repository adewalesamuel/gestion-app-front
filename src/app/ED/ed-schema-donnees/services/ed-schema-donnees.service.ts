import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { EDSchemaDonneesEntity } from '../ed-schema-donnees.entity';

@Injectable({
  providedIn: 'root'
})
export class EDSchemaDonneesService {
  readonly ENDPOINT = '/ed-schema-donneess';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<EDSchemaDonneesEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<EDSchemaDonneesEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<EDSchemaDonneesEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<EDSchemaDonneesEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<EDSchemaDonneesEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}