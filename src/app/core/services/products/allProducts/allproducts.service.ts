import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { base_Url } from '../../../custom_injection/api_BaseUrl';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllproductsService {
  private products$!:Observable<any>
  constructor(private readonly _http:HttpClient,@Inject(base_Url) private readonly apiBaseUrl:string) { }
  getAllProducts():Observable<any>
  {
    if(!this.products$)
    {
      this.products$ =  this._http.get(this.apiBaseUrl + `products`)
    }
    return this.products$
  }
}
