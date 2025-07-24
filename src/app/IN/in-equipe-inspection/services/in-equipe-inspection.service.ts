import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { INEquipeInspectionEntity } from '../in-equipe-inspection.entity';

@Injectable({
  providedIn: 'root'
})
export class INEquipeInspectionService {
  readonly ENDPOINT = '/in-equipe-inspections';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<INEquipeInspectionEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<INEquipeInspectionEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<INEquipeInspectionEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<INEquipeInspectionEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<INEquipeInspectionEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}