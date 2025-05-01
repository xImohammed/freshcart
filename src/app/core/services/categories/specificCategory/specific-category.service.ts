import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { base_Url } from '../../../custom_injection/api_BaseUrl';


@Injectable({
  providedIn: 'root'
})
export class SpecificCategoryService {

  constructor(private readonly _http:HttpClient, @Inject(base_Url) private readonly abiBaseUrl:string) { }
  getSpecificCategory(id:string)
  {
    return this._http.get(this.abiBaseUrl+ `categories/${id}`)
  }
}
