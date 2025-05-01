import { base_Url } from '../../custom_injection/api_BaseUrl';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { redirect_Url } from '../../custom_injection/redirect_Url';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private readonly _http:HttpClient , @Inject(base_Url) private apiBaseUrl:string,@Inject(redirect_Url) private redirectUrl:string) { }
  checkOut(cartId:string,data:object)
  {
    return this._http.post(this.apiBaseUrl + `orders/checkout-session/${cartId}?url=${this.redirectUrl}`,{
      shippingAdress:data
    })
  }
}
