import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { base_Url } from '../../../custom_injection/api_BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class SpecificProductService {
  // private readonly apiBaseUrl
  constructor(private _http:HttpClient, @Inject (base_Url) private readonly apiBaseUrl:string ) { }
  getSpecificProduct(id:string):Observable<any>
  {
    return this._http.get(this.apiBaseUrl + `products/${id}`)
  }
}
