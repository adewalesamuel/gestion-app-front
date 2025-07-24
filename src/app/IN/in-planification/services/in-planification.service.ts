import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { INPlanificationEntity } from '../in-planification.entity';

@Injectable({
  providedIn: 'root'
})
export class INPlanificationService {
  readonly ENDPOINT = '/in-planifications';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<INPlanificationEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<INPlanificationEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<INPlanificationEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<INPlanificationEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<INPlanificationEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}