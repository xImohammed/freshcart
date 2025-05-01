import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AllproductsService } from '../../../core/services/products/allProducts/allproducts.service';
import { AllCategoriesService } from '../../../core/services/categories/allCategories/all-categories.service';
import { IProduct } from '../../../core/models/iproduct';
import { Icategory } from '../../../core/models/icategory';
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,ProductCardComponent,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _allProductService = inject(AllproductsService)
  private readonly _allCategoriesService = inject(AllCategoriesService)
  private subscriptions: Subscription = new Subscription();

  productSearchText:string =''
  productsData:IProduct[]=[]
  categoriesData:Icategory[]=[]

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getProducts() {
    this.subscriptions.add(
      this._allProductService.getAllProducts().subscribe({
        next:(res)=>{
          this.productsData = res.data
        }
      })
    );
  }

  getCategories() {
    this.subscriptions.add(
      this._allCategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoriesData = res.data
        }
      })
    );
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplayHoverPause:true,
    autoplay:true,
    autoplaySpeed:300,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  customOptions2: OwlOptions = {
    loop:false,
    autoplayHoverPause:true,
    autoplay:true,
    autoplaySpeed:300,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots:false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
}
