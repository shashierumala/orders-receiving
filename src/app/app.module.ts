import { LoadingInterceptor } from './_helpers/loading.interceptors';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagService } from './services/tag.service';
import { TagListComponent } from './tag-list/tag-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { TagSummaryComponent } from './tag-summary/tag-summary.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { ErrorComponentComponent } from './reusable/error-component/error-component.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { ListboxModule } from 'primeng/listbox';
import { InputNumberModule } from 'primeng/inputnumber';
//import { NgIdleModule } from '@ng-idle/core';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { SplitterModule } from 'primeng/splitter';
import { TagComponent } from './tag/tag.component';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { LoadingComponent } from './loading/loading.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SearchModalComponent } from './reusable/search-modal/search-modal.component';
import { LocationSearchModalComponent } from './location-search-modal/location-search-modal.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    TagListComponent,
    TagSummaryComponent,
    ErrorComponentComponent,
    LoginPageComponent,
    TagComponent,
    LoadingComponent,
    SearchModalComponent,
    LocationSearchModalComponent,
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
    InputTextareaModule,
    InputNumberModule,
    DataViewModule,
    ToastModule,
    SplitterModule,
    ConfirmDialogModule,
    //NgIdleModule.forRoot(),
    BrowserAnimationsModule,
    ProgressSpinnerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    DialogService,
    TagService,
    ConfirmationService,
    AuthService,
    TokenStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
})
export class AppModule {}
