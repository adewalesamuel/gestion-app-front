import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { EDFormatDonneesEntity } from '../ed-format-donnees.entity';

@Injectable({
  providedIn: 'root'
})
export class EDFormatDonneesService {
  readonly ENDPOINT = '/ed-format-donneess';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<EDFormatDonneesEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<EDFormatDonneesEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<EDFormatDonneesEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<EDFormatDonneesEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<EDFormatDonneesEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}