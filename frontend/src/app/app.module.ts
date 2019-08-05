import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ListsComponent} from './lists/lists.component';
import {TaskDetail} from './one-list/one-list.component';
import {RegistrationComponent} from './registration/registration.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {OneItemComponent} from './one-item/one-item.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ItemsComponent} from './items/items.component';
import {TableModule} from 'primeng/table';
import {DialogModule, MultiSelectModule} from 'primeng/primeng';
import {SidebarModule} from 'primeng/sidebar';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'tasks', component: ListsComponent},
  {path: 'tasks/detail/:id', component: ListsComponent},
  {path: 'tasks/new', component: ListsComponent},
  {path: 'item/new/:id', component: ListsComponent},
  {path: 'itemlist/:id', component: ListsComponent},
  {path: 'register', component: RegistrationComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListsComponent,
    TaskDetail,
    RegistrationComponent,
    OneItemComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, HttpClientModule, CardModule, ButtonModule, DropdownModule,
    CalendarModule, BrowserAnimationsModule, TableModule, MultiSelectModule, DialogModule, SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
