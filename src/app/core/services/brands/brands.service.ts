import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { base_Url } from '../../custom_injection/api_BaseUrl';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private brands$!:Observable<any>
  constructor(private readonly _http:HttpClient,@Inject(base_Url) private apiBaseUrl:string) { }
  getAllBrands():Observable<any>{
    if(!this.brands$)
    {
this.brands$ = this._http.get(this.apiBaseUrl + `brands`).pipe(
  shareReplay(1)
)
    }
    return this.brands$
  }
}
