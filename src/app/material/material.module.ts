import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material';


const modules = [
  MatButtonModule
];

@NgModule({
  exports: modules,
  declarations: [],
  imports: modules,
})
export class MaterialModule { }
