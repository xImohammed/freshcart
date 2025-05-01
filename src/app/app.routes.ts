import { Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth/auth.component';
import { MainlayoutComponent } from './feature/layout/mainlayout/mainlayout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [loggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./core/auth/components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./core/auth/components/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'forget',
        loadComponent: () => import('./core/auth/components/forgetpass/forgetpass.component').then(c => c.ForgetpassComponent)
      }
    ]
  },
  {
    path: '',
    component: MainlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./feature/pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./feature/pages/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'brands',
        loadComponent: () => import('./feature/pages/brands/brands.component').then(m => m.BrandsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./feature/pages/category/category.component').then(m => m.CategoryComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./feature/pages/products/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'product-details/:id',
        loadComponent: () =>
          import('./feature/pages/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent
          ),
        data: { renderMode: 'client' } 
      }
      ,
      {
        path: 'check-out',
        loadComponent: () => import('./feature/pages/check-out/check-out.component').then((c) => c.CheckOutComponent)
      },
      {
        path: 'allorders',
        loadComponent: () => import('./feature/pages/allorders/allorders.component').then((c) => c.AllordersComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./feature/pages/notfound/notfound.component').then(c => c.NotfoundComponent)
  }
];
