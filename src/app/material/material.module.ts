import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';


const material = [
  MatButtonModule,
  MatDialogModule
];

@NgModule({
  imports: [ 
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }

