import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { INInspectionEntity } from '../in-inspection.entity';

@Injectable({
  providedIn: 'root'
})
export class INInspectionService {
  readonly ENDPOINT = '/in-inspections';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<INInspectionEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<INInspectionEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<INInspectionEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<INInspectionEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<INInspectionEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}