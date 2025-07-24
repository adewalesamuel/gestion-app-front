import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { REOrdreRecetteEntity } from '../re-ordre-recette.entity';

@Injectable({
  providedIn: 'root'
})
export class REOrdreRecetteService {
  readonly ENDPOINT = '/re-ordre-recettes';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<REOrdreRecetteEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<REOrdreRecetteEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<REOrdreRecetteEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<REOrdreRecetteEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<REOrdreRecetteEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}