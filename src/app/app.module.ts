import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DatePipe } from '@angular/common';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { TokenInterceptor } from './auth/token.interceptor';

@NgModule({
  //components,directives for exporting
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    AddProductComponent,
    ListProductComponent,
    UpdateProductComponent,
    LoginComponent,
    RegisterComponent,
    UpdateCategoryComponent
  ],
  imports: [ //importing on other components
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, //registering in providers(step1 of dependency injection) => line 14 //Step 2 Injection in constructor update-product.component.ts(line 25) //line65 third step transform
       {provide : HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi:true}],              
   bootstrap: [AppComponent]
})
export class AppModule { }
