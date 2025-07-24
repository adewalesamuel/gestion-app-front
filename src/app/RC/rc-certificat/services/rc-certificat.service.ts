import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { RCCertificatEntity } from '../rc-certificat.entity';

@Injectable({
  providedIn: 'root'
})
export class RCCertificatService {
  readonly ENDPOINT = '/rc-certificats';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<RCCertificatEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<RCCertificatEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<RCCertificatEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<RCCertificatEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<RCCertificatEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}