import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScannerOriginal } from '@awesome-cordova-plugins/barcode-scanner';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [ 
    BarcodeScannerOriginal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
