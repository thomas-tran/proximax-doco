import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import {
  PROXIMAX_REMOTE_BASE_URL,
  NEM_NETWORK
} from 'xpx-typescript-angular-sdk';
import { NetworkTypes } from 'nem-library';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: PROXIMAX_REMOTE_BASE_URL,
      useValue: environment.ProximaX.remoteConnection
    },
    { provide: NEM_NETWORK, useValue: NetworkTypes.TEST_NET }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
