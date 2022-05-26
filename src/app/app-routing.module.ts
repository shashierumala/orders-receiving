import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponentComponent } from './reusable/error-component/error-component.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrdersInfoComponent } from './orders-info/orders-info.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'order-info' , component: OrdersInfoComponent, canActivate: [AuthGuard]},
  {path: 'order-summary/api/receiving', component: OrderSummaryComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo:'/login', pathMatch : 'full'},
  {path:'500', component:ErrorComponentComponent},
  {path: '**', redirectTo:'/login'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
