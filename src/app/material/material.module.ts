import { NgModule } from '@angular/core';
import {MatButtonModule, MatListModule, MatExpansionModule, MatChipsModule, MatIconModule, MatToolbarModule} from '@angular/material';


const modules = [
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatChipsModule,
  MatIconModule,
  MatToolbarModule
];

@NgModule({
  exports: modules,
  declarations: [],
  imports: modules,
})
export class MaterialModule { }
