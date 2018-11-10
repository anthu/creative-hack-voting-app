import { NgModule } from '@angular/core';
import {MatButtonModule, MatListModule, MatExpansionModule, MatChipsModule} from '@angular/material';


const modules = [
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatChipsModule,
];

@NgModule({
  exports: modules,
  declarations: [],
  imports: modules,
})
export class MaterialModule { }
