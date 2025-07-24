import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { EDAbonnementEntity } from '../ed-abonnement.entity';

@Injectable({
  providedIn: 'root'
})
export class EDAbonnementService {
  readonly ENDPOINT = '/ed-abonnements';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<EDAbonnementEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<EDAbonnementEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<EDAbonnementEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<EDAbonnementEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<EDAbonnementEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}