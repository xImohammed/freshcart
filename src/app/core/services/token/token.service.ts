import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserData } from '../../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  userData: UserData | null = null;
  userId!: string;

  constructor() {}

  getUserData() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.userData = jwtDecode<UserData>(token);
      this.userId = this.userData.id;
    }
  }
}
