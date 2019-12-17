import { Component, OnInit } from '@angular/core';
import { Poster } from '../poster';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PosterService } from '../poster.service';
import { MatDialog } from '@angular/material';
import { DialogDeletionComponent } from '../dialog-deletion/dialog-deletion.component';

@Component({
  selector: 'app-update-poster',
  templateUrl: './update-poster.component.html',
  styleUrls: ['./update-poster.component.css']
})
export class UpdatePosterComponent implements OnInit {
  poster = new Poster;
  submitted;

  constructor(private _posterService: PosterService,
              private _authService: AuthService, 
              private _route: ActivatedRoute, 
              private _router: Router,
              private _location: Location,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getPoster();
  }

  checkUserId() {
      if (this.poster.userId === this._authService.getUserId()) {
        return true;
      } else {
        return false;
      }
  }

  deletePoster(poster: Poster): void {
    if (this.checkUserId()) {
      this._posterService.deletePoster(poster).subscribe();
      this._router.navigate(['/ownposters']);
    }
  }

  getPoster(): void {
    const _id = this._route.snapshot.paramMap.get('id');
    this._posterService.getPoster(_id)
      .subscribe(poster => this.poster = poster);
  }

  goBack(): void {
    this._location.back();
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DialogDeletionComponent, {data: {title: this.poster.title}});
    dialogRef.afterClosed().subscribe(result => {
      if ( result === "delete" ) {
        this.deletePoster(this.poster);
      } 
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogDeletionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

  updatePoster(): void {
    if (this.checkUserId()) {
    this._posterService.updatePoster(this.poster._id, this.poster)
      .subscribe(() => this.goBack());
    }
  }
}
