import { NgModule } from '@angular/core';
import {MatButtonModule, MatListModule, MatExpansionModule, MatChipsModule, MatIconModule, MatToolbarModule, MatDialogModule} from '@angular/material';


const modules = [
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatChipsModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule
];

@NgModule({
  exports: modules,
  declarations: [],
  imports: modules,
})
export class MaterialModule { }
