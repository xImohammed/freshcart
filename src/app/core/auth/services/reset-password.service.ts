import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { base_Url } from '../../custom_injection/api_BaseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private readonly _http:HttpClient , @Inject(base_Url) private readonly apiBaseUrl:string ) { }
  sendResetPasswordData(data:object):Observable<any>
{
return this._http.put(this.apiBaseUrl + `auth/resetPassword`,data)
}
}
