import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { routeAuthGuard } from './auth/route-auth.guard';

const routes: Routes = [
  {path:'categories', component: ListCategoryComponent,canActivate:[routeAuthGuard]},//guard will help us to check the route is safe without login
  {path:'categories/add', component: AddCategoryComponent,canActivate:[routeAuthGuard]},
  {path:'categories/edit/:id',component:UpdateCategoryComponent,canActivate:[routeAuthGuard]},
  {path:'products', component:ListProductComponent,canActivate:[routeAuthGuard]},
  {path:'products/add', component:AddProductComponent,canActivate:[routeAuthGuard]},
  {path:'products/edit/:id' , component:UpdateProductComponent,canActivate:[routeAuthGuard]},
  {path:'' , component:LoginComponent}, //initially loading login
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
