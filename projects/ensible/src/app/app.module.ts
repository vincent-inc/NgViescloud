import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViescloudUtilsModule } from 'projects/viescloud-utils/src/public-api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EnsibleAuthInterceptor } from './guard/ensible-auth.interceptor';
import { EnsibleSettingComponent } from './ensible-setting/ensible-setting.component';
import { EnsibleFsComponent } from './ensible-fs/ensible-fs.component';
import { EnsibleUserComponent } from './ensible-user/ensible-user.component';
import { EnsibleItemListComponent } from './item/ensible-item-list/ensible-item-list.component';
import { EnsibleItemComponent } from './item/ensible-item/ensible-item.component';
import { EnsibleItemRunComponent } from './item/ensible-item-run/ensible-item-run.component';
import { EnsibleItemRunHistoryComponent } from './item/ensible-item-run-history/ensible-item-run-history.component';
import { EnsibleItemTabComponent } from './item/ensible-item-tab/ensible-item-tab.component';
import { EnsibleAnsibleCfgComponent } from './ensible-ansible-cfg/ensible-ansible-cfg.component';
import { SettingService } from 'projects/viescloud-utils/src/lib/service/Setting.service';
import { EnsibleSettingService } from './service/ensible-setting/ensible-setting.service';
import { S3StorageServiceV1 } from 'projects/viescloud-utils/src/lib/service/ObjectStorageManager.service';
import { EnsibleDatabaseObjectStorageService } from './service/ensible-database-object-storage/ensible-database-object-storage.service';

const LIST = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  EnsibleSettingComponent,
  EnsibleFsComponent,
  EnsibleUserComponent,
  EnsibleItemListComponent,
  EnsibleItemComponent,
  EnsibleItemRunComponent,
  EnsibleItemRunHistoryComponent,
  EnsibleItemTabComponent,
  EnsibleAnsibleCfgComponent
]

@NgModule({
  declarations: [
    ...LIST
  ],
  imports: [
    ViescloudUtilsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsibleAuthInterceptor,
      multi: true
    },
    {
      provide: SettingService,
      useClass: EnsibleSettingService
    },
    {
      provide: S3StorageServiceV1,
      useClass: EnsibleDatabaseObjectStorageService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
