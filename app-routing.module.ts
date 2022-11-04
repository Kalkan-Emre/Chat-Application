import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';
import {ListUsersComponent } from './components/list-users/list-users.component';
import {UserEditComponent } from './components/user-edit/user-edit.component';
import {LoginComponent } from './components/login/login.component';
import { PublicComponent } from './components/public/public.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { OutboxComponent } from './components/outbox/outbox.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/authGuard';
import { AdminGuard } from './guards/adminGuard';
import { ListUserLogsComponent } from './components/list-user-logs/list-user-logs.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  { path: 'create-user', component: UserCreateComponent, canActivate:[AuthGuard,AdminGuard] },
  { path: 'list-users', component: ListUsersComponent, canActivate:[AuthGuard,AdminGuard] },  
  { path: 'edit-user/:id', component: UserEditComponent, canActivate:[AuthGuard,AdminGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'public', component: PublicComponent},
  {path: 'send-message', component: SendMessageComponent, canActivate:[AuthGuard]},
  {path: 'inbox', component: InboxComponent, canActivate:[AuthGuard]},
  {path: 'outbox', component: OutboxComponent, canActivate:[AuthGuard]},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate:[AuthGuard,AdminGuard]},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard,AdminGuard]},
  {path: 'user', component: UserComponent, canActivate:[AuthGuard]},
  {path: 'user-logs', component: ListUserLogsComponent, canActivate:[AuthGuard,AdminGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
