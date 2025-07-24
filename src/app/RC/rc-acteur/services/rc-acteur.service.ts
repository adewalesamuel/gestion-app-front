import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RCActeurEntity } from '../rc-acteur.entity';

@Injectable({
  providedIn: 'root'
})
export class RCActeurService {
  readonly ENDPOINT = '/rc-acteurs';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RCActeurEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RCActeurEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RCActeurEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RCActeurEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RCActeurEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}