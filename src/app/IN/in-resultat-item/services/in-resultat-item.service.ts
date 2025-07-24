import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { INResultatItemEntity } from '../in-resultat-item.entity';

@Injectable({
  providedIn: 'root'
})
export class INResultatItemService {
  readonly ENDPOINT = '/in-resultat-items';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<INResultatItemEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<INResultatItemEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<INResultatItemEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<INResultatItemEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<INResultatItemEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}