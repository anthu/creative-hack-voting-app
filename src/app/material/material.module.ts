import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatChipsModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
} from '@angular/material';


const modules = [
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatChipsModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
  MatProgressSpinnerModule
];

@NgModule({
  exports: modules,
  declarations: [],
  imports: modules,
})
export class MaterialModule { }
