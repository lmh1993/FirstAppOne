import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { PosterService } from '../poster.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogDeletionComponent } from '../dialog-deletion/dialog-deletion.component';
import { PosterDetailComponent } from '../poster-detail/poster-detail.component';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.css']
})
export class PostersComponent implements OnInit {
  iconUrl = "https://res.cloudinary.com/di8upirgz/image/upload/v1576801740/smallposter/logo_here_xvpclg.png";
  posters = [];
  ownPosters = [];
  male = "&#9794;";
  female = "&#9792;";
  constructor(@Inject(LOCALE_ID) public locale: string, 
              private _posterService: PosterService, 
              private _route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this._posterService.getPosters()
    .subscribe(
      res => this.posters = res,
      err => console.log(err)
    )
  }

  getShowcase() {
    const _showcase = this._route.snapshot.paramMap.get('showcase');
    console.log(_showcase);
    return _showcase;
  }

  functionA() {
    let dialogRef = this.dialog.open(DialogDeletionComponent, {data: {title: "aaa"}});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDetailDialog(posterId) {
    let dialogRef = this.dialog.open(PosterDetailComponent, {data: {posterId: posterId}});
    dialogRef.afterClosed().subscribe(result => {
      if ( result === "applied" ) {
        //mark this card as applied
      } 
    });
  }

}
