import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, 
         MatRippleModule, MatDialogModule,
         MatInputModule, MatFormFieldModule} from '@angular/material';



const material = [
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatRippleModule,
  MatInputModule,
  MatFormFieldModule
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

