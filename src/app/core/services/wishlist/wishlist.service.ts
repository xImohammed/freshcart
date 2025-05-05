import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { base_Url } from '../../custom_injection/api_BaseUrl';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

public wishListItemsCounter:WritableSignal<number | null> = signal(0)
  constructor(private readonly _http:HttpClient, @Inject(base_Url) private readonly apiBaseUrl:string) { }
  addToWishList(pId:string):Observable<any>
  {
    return this._http.post(this.apiBaseUrl + `wishlist`,{
      productId : pId
    })
  }
  getUserWishlist():Observable<any>
  {
    return this._http.get(this.apiBaseUrl + `wishlist`)
  }
  deleteItemFromWishList(pId:string):Observable<any>
  {
    return this._http.delete(this.apiBaseUrl + `wishlist/${pId}`)
  }
}
