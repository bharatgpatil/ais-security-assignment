import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatTreeModule,
  MatCardModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatTreeModule,
  MatCardModule,
  MatListModule
  ],
  exports: [
    MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatTreeModule,
  MatCardModule,
  MatListModule
  ]
})
export class MaterialModule {}