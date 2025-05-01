// allorders.component.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { AllOrdersService } from '../../../core/services/allOrders/all-orders.service';
import { TokenService } from '../../../core/services/token/token.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AllOrders } from '../../../core/models/all-orders';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, CommonModule],
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
    this.userId = this.tokenService.userId;

    this.subscriptions.add(
      this.allOrdersService.getUserOrders(this.userId).subscribe({
        next: (res) => {
          this.orders = Array.isArray(res) ? res : [res];
          this.isLoading = false;
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
