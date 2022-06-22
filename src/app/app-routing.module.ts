import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponentComponent } from './reusable/error-component/error-component.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TagSummaryComponent } from './tag-summary/tag-summary.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'tag-list' , component: TagListComponent, canActivate: [AuthGuard]},
  {path: 'tag-summary/api/receiving', component: TagSummaryComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo:'/login', pathMatch : 'full'},
  {path:'500', component:ErrorComponentComponent},
  {path: '**', redirectTo:'/login'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
