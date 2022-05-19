import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersService } from './services/orders.service';
import { OrdersInfoComponent } from './orders-info/orders-info.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {FieldsetModule} from "primeng/fieldset";
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToolbarModule} from 'primeng/toolbar';
import { ErrorComponentComponent } from './reusable/error-component/error-component.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import {ListboxModule} from 'primeng/listbox';
import {InputNumberModule} from 'primeng/inputnumber';
import { NgIdleModule } from '@ng-idle/core';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {SplitterModule} from 'primeng/splitter';
import { OrderComponent } from './order/order.component';
import {PaginatorModule} from 'primeng/paginator';
import {DataViewModule} from 'primeng/dataview';
import {DividerModule} from 'primeng/divider';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './_helpers/loading.interceptors';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { SearchModalComponent } from './reusable/search-modal/search-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersInfoComponent,
    OrderSummaryComponent,
    ErrorComponentComponent,
    LoginPageComponent,
    OrderComponent,
    LoadingComponent,
    SearchModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListboxModule,
    PaginatorModule,
    HttpClientModule,
    DynamicDialogModule,
    FormsModule,
    TableModule,
    FieldsetModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    DividerModule,
    CardModule,
    InputNumberModule,
    DataViewModule,
    ToastModule,
    SplitterModule,
    NgIdleModule.forRoot(),
    BrowserAnimationsModule,
    ProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
  providers: [DialogService, OrdersService, AuthService, TokenStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true}]
})
export class AppModule { }
