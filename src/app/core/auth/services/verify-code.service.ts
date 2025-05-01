import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { base_Url } from '../../custom_injection/api_BaseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeService {

  constructor(private readonly _http:HttpClient , @Inject(base_Url) private readonly apiBaseUrl:string) { }
  sendVerifyCode(data:object):Observable<any>
  {
    return this._http.post(this.apiBaseUrl + `auth/verifyResetCode`,data)
  }
}
