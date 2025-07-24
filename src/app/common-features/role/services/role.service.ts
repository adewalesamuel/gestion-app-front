import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RoleEntity } from '../role.entity';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  readonly ENDPOINT = '/roles';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RoleEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RoleEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RoleEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RoleEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RoleEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}