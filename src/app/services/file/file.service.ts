import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly ENPOINTS = {
    File: '/upload',
    FileDoc: '/upload-file',
  };

  constructor(protected httpService: HttpService) { }

  store = (payload: any) => {
    return this.httpService.postFormData(this.ENPOINTS.File, payload)
  }

  storeDoc = (payload: any) => {
    return this.httpService.postFormData(this.ENPOINTS.FileDoc, payload)
  }
}
