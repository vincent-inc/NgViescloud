import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'projects/viescloud-utils/src/lib/service/Authenticator.service';
import { OpenIdService } from 'projects/viescloud-utils/src/lib/service/OpenId.service';
import { QuickSideDrawerMenu } from 'projects/viescloud-utils/src/lib/share-component/quick-side-drawer-menu/quick-side-drawer-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wrap';

  menu: QuickSideDrawerMenu[] = [
    {
      title: 'Viescloud',
      children: [
        {
          title: 'Home',
          routerLink: '/home'
        },
        {
          title: 'Login',
          routerLink: '/login',
          hideConditional: () => this.authenticatorService.isLoginB,
          click: () => this.openIdService.authorizeFlow()
        },
        {
          title: 'logout',
          routerLink: '/logout',
          hideConditional: () => !this.authenticatorService.isLoginB,
          click: () => this.authenticatorService.logoutWithoutReroute()
        }
      ]
    },
    {
      title: 'About',
      children: [
        {
          title: 'Legal',
          routerLink: '/legal'
        },
        {
          title: 'Privacy',
          routerLink: '/privacy'
        }
      ]
    }
  ]

  constructor(
    public router: Router, 
    private authenticatorService: AuthenticatorService,
    private openIdService: OpenIdService
  ) { }
}
