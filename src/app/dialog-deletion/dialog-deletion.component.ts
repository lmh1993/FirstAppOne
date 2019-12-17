import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-deletion',
  templateUrl: './dialog-deletion.component.html',
  styleUrls: ['./dialog-deletion.component.css']
})
export class DialogDeletionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
