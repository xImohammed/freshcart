import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserstateService {

  constructor() { }
  userChanged = signal(false);
  triggerUserChange(): void {
    this.userChanged.set(true);
  }
}
