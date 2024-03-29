import { Routes } from '@angular/router';
import { LoginComponent } from './Website/login/login.component';
import { BlogsComponent } from './User/blogs/blogs.component';
import { HomeComponent } from './home/home.component';
import { ProductdetailComponent } from './Website/productdetail/productdetail.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ProductformComponent } from './Admin/productform/productform.component';
import { BlogformComponent } from './Admin/blogform/blogform.component';
import { CartitemComponent } from './User/cartitem/cartitem.component';
import { ShippingformComponent } from './User/shippingform/shippingform.component';
import { PaymentComponent } from './User/payment/payment.component';
import { BlogdetailComponent } from './User/blogdetail/blogdetail.component';

export const routes: Routes = [
{path:'',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'blogs',component:BlogsComponent},
{path:'blog/:id',component:BlogdetailComponent},
{path:'product/:id',component:ProductdetailComponent},
{path:'dashboard',component:DashboardComponent},
{path:'productform',component:ProductformComponent},
{path:'blogform',component:BlogformComponent},
{path:'cart',component:CartitemComponent},
{path:'cart/shippingaddress',component:ShippingformComponent},
{path:'cart/shippingaddress/payment',component:PaymentComponent},


];
