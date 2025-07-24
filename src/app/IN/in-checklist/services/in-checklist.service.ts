import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { INChecklistEntity } from '../in-checklist.entity';

@Injectable({
  providedIn: 'root'
})
export class INChecklistService {
  readonly ENDPOINT = '/in-checklists';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<INChecklistEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<INChecklistEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<INChecklistEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<INChecklistEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<INChecklistEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}