import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrdersInfoComponent } from './orders-info/orders-info.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'order-info' , component: OrdersInfoComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo:'/login', pathMatch : 'full'},
  {path: 'order-summary/api/receiving', component: OrderSummaryComponent, canActivate: [AuthGuard]},
  {path:'500', component:ErrorComponentComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
