import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideDrawerComponent } from './side-drawer/side-drawer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestSenderComponent } from './request-sender/request-sender.component';
import { RouteComponent } from './Authentication/route/route.component';
import { RoutePanelComponent } from './Authentication/route/route-panel/route-panel.component';
import { UserRoleComponent } from './Authentication/user-role/user-role.component';
import { UsersComponent } from './Authentication/users/users.component';
import { QuestionComponent } from './vgame/question/question.component';
import { VenkinsHomeComponent } from './Venkins/venkins-home/venkins-home.component';
import { ConfigMapComponent } from './Venkins/config-map/config-map.component';
import { AutoRouteComponent } from './Authentication/auto-route/auto-route.component';
import { RouteDialog } from './Authentication/auto-route/route-dialog/route-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { ViescloudUtilsModule } from 'projects/viescloud-utils/src/public-api';
import { AuthInterceptor } from 'projects/viescloud-utils/src/lib/guards/auth.interceptor';
import { DnsManagerComponent } from './dns-manager/dns-manager.component';
import { DnsRecordComponent } from './dns-manager/dns-record/dns-record.component';

export const defaultTextColor = 'white';

const LIST = [
  AppComponent,
  HomeComponent,
  SideDrawerComponent,
  RequestSenderComponent,
  RouteComponent,
  RoutePanelComponent,
  UsersComponent,
  UserRoleComponent,
  QuestionComponent,
  VenkinsHomeComponent,
  ConfigMapComponent,
  AutoRouteComponent,
  RouteDialog,
  DnsManagerComponent,
  DnsRecordComponent
]

@NgModule({
  declarations: [	
    ... LIST,
      DnsManagerComponent
   ],
  imports: [
    AppRoutingModule,
    ViescloudUtilsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
