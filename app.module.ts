import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guards/authGuard';
import { AdminGuard } from './guards/adminGuard';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LoginComponent } from './components/login/login.component';
import { PublicComponent } from './components/public/public.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { OutboxComponent } from './components/outbox/outbox.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { ListUserLogsComponent } from './components/list-user-logs/list-user-logs.component';
import { MatTableModule } from '@angular/material/table'
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    ListUsersComponent,
    UserEditComponent,
    LoginComponent,
    PublicComponent,
    SendMessageComponent,
    InboxComponent,
    OutboxComponent,
    AdminPanelComponent,
    AdminComponent,
    UserComponent,
    ListUserLogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,          
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [ApiService,AuthService,AuthGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
