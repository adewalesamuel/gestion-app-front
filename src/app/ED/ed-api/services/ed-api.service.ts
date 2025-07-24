import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { EDApiEntity } from '../ed-api.entity';

@Injectable({
  providedIn: 'root'
})
export class EDApiService {
  readonly ENDPOINT = '/ed-apis';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<EDApiEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<EDApiEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<EDApiEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<EDApiEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<EDApiEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}