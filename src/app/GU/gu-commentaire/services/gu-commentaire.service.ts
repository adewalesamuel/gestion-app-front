import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';
import { Response } from '../../../types';
import { GUCommentaireEntity } from '../gu-commentaire.entity';

@Injectable({
  providedIn: 'root'
})
export class GUCommentaireService {
  readonly ENDPOINT = '/gu-commentaires';

  constructor(protected httpService: HttpService) { }

  getAll(params: any): Promise<Response<GUCommentaireEntity[]>> {
    return this.httpService.getAll(`${this.ENDPOINT}?page=${params?.page ?? ''}`);
  }

  getById(id: number): Promise<Response<GUCommentaireEntity>> {
    return this.httpService.get(`${this.ENDPOINT}/${id}`);
  }

  create(payload: string): Promise<Response<GUCommentaireEntity>> {
      return this.httpService.post(this.ENDPOINT, payload)
  }

  update(id: number, payload: string): Promise<Response<GUCommentaireEntity>> {
      return this.httpService.put(`${this.ENDPOINT}/${id}`, payload)
  }
  destroy(id: number): Promise<Response<GUCommentaireEntity>> {
      return this.httpService.erase(`${this.ENDPOINT}/${id}`)
  }
}