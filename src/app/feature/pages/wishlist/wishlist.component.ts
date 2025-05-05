import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../../core/models/wishlist';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
private readonly _wishlistService = inject(WishlistService)
public readonly _toastrService = inject(ToastrService)
public wishlistData!: Iwishlist[]
ngOnInit(): void {
  this.getUserWishlist()
}
getUserWishlist()
{
  this._wishlistService.getUserWishlist().subscribe(
    {
      next:(res)=>
      {
        this.wishlistData = res.data
      }
    }
  )
}
deleteItemFromWishlist(pId:string)
{
this._wishlistService.deleteItemFromWishList(pId).subscribe({
  next:(res)=>{
this._toastrService.success(res.message)
this._wishlistService.wishListItemsCounter.set(res.data.length)
this.getUserWishlist()
  }
})
}
}
