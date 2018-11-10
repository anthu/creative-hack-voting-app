import { NgModule } from '@angular/core';
import {MatButtonModule, MatListModule, MatExpansionModule, MatChipsModule, MatIconModule} from '@angular/material';


const modules = [
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatChipsModule,
  MatIconModule,
];

@NgModule({
  exports: modules,
  declarations: [],
  imports: modules,
})
export class MaterialModule { }
