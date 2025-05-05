// allorders.component.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { AllOrdersService } from '../../../core/services/allOrders/all-orders.service';
import { TokenService } from '../../../core/services/token/token.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AllOrders } from '../../../core/models/all-orders';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, CommonModule,RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit, OnDestroy {
  private readonly tokenService = inject(TokenService);
  private readonly allOrdersService = inject(AllOrdersService);
  private subscriptions: Subscription = new Subscription();

  orders: AllOrders[] = [];
  userId!: string;
  isLoading = true;

  ngOnInit(): void {
    this.tokenService.getUserData()
    this.subscriptions.add(
      this.allOrdersService.getUserOrders(this.tokenService.userId).subscribe({
        next: (res) => {
          this.orders = Array.isArray(res) ? res : [res];
          this.isLoading = false;
          this.allOrdersService.numberOfAllOrders.set(this.orders.length)
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
