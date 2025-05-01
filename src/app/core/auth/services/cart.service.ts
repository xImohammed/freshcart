import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { base_Url } from '../../custom_injection/api_BaseUrl';
import { Observable, shareReplay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart$!:Observable<any>
  constructor(private readonly _http:HttpClient,@Inject(base_Url) private apiBaseUrl:string) { }

  addToCart(pId:string):Observable<any>{
    return this._http.post(this.apiBaseUrl + `cart`,{
      productId:pId
    })
  }
  getCarT():Observable<any>
  {
    if(!this.cart$)
    {
      this.cart$ = this._http.get(this.apiBaseUrl + `cart`).pipe(
        shareReplay(1)
      )
    }
return this.cart$
  }
  deleteSpecificCartItem(pId:string):Observable<any>
  {
return this._http.delete(this.apiBaseUrl + `cart/${pId}`)
  }
  updateSpecificItemQuantity(count:number,pId:string):Observable<any>{
    return this._http.put(this.apiBaseUrl + `cart/${pId}`,{
      count:count
    })
      }
      clearAllCart():Observable<any>
      {
        return this._http.delete(this.apiBaseUrl + `cart`)
      }

}
