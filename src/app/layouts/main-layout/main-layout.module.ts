import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {MainLayoutRoutes} from './main-layout.routing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';

import {MaterialModule} from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    MaterialModule
  ],
  exports: [
  ],
  declarations: [
    DashboardComponent
  ]
})

export class MainLayoutModule {
}
