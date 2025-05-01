import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { base_Url } from '../../custom_injection/api_BaseUrl';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllOrdersService {
  private orders$!:Observable<any>
  constructor(private readonly _http:HttpClient,@Inject(base_Url) private apiBaseUrl:string ) { }
  getUserOrders(id:string):Observable<any>
  {
    if(!this.orders$){
      this.orders$ = this._http.get(this.apiBaseUrl+`orders/user/${id}`).pipe(
        shareReplay(1))
    }



    return this.orders$
  }
}
