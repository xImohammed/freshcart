import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { base_Url } from '../../../custom_injection/api_BaseUrl';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService {
  private categories$!:Observable<any>
  constructor(private readonly _http :HttpClient,@Inject(base_Url) private readonly abiBaseUrl:string) { }
  getAllCategories():Observable<any>
  {
    if(!this.categories$)
    {
this.categories$ =this._http.get(this.abiBaseUrl +'categories')
    }
    return this.categories$
  }
}
