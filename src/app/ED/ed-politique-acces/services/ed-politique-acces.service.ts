import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { EDPolitiqueAccesEntity } from '../ed-politique-acces.entity';

@Injectable({
  providedIn: 'root'
})
export class EDPolitiqueAccesService {
  readonly ENDPOINT = '/ed-politique-access';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<EDPolitiqueAccesEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<EDPolitiqueAccesEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<EDPolitiqueAccesEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<EDPolitiqueAccesEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<EDPolitiqueAccesEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}