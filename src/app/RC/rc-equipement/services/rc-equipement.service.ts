import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RCEquipementEntity } from '../rc-equipement.entity';

@Injectable({
  providedIn: 'root'
})
export class RCEquipementService {
  readonly ENDPOINT = '/rc-equipements';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RCEquipementEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RCEquipementEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RCEquipementEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RCEquipementEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RCEquipementEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}