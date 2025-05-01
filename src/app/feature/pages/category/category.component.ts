import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AllCategoriesService } from '../../../core/services/categories/allCategories/all-categories.service';
import { Icategory } from '../../../core/models/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnDestroy {
  private readonly categoryService = inject(AllCategoriesService);
  private subscriptions: Subscription = new Subscription();

  categories!: Icategory[];

  ngOnInit(): void {
    this.getAllCategory();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAllCategory() {
    this.subscriptions.add(
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          this.categories = res.data;
        }
      })
    );
  }
}
