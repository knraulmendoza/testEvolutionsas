import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './pages/nav-menu/nav-menu.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './services/login.service';
import { PersonService } from './services/person.service';
import ApiBase from './helper/ApiBase';
import { MapaComponent } from './pages/mapa/mapa.component';

import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './guards/auth.interceptor';
import { UsuarioComponent } from './pages/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    MapaComponent,
    UsuarioComponent
  ],
  imports: [
    NgbModule,
    NgbPaginationModule, NgbAlertModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
      RouterModule.forRoot([
          { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard]  },
          { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      { 
        path: 'nav',
       component: NavMenuComponent,
       children: [
         {
           path: 'mapa',
           component: MapaComponent
         }
          ],
          canActivate: [LoginGuard]
       },
    ])
  ],
  providers: [
    LoginService,
    PersonService,
    ApiBase,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
