import { Component, OnInit } from '@angular/core';
import { Poster } from '../poster';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PosterService } from '../poster.service';
import { MatDialog } from '@angular/material';
import { DialogDeletionComponent } from '../dialog-deletion/dialog-deletion.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-update-poster',
  templateUrl: './update-poster.component.html',
  styleUrls: ['./update-poster.component.css']
})
export class UpdatePosterComponent implements OnInit {
  poster = new Poster;
  selectedFile: File = null;
  previewUrl: SafeUrl;
  submitted;

  constructor(private _posterService: PosterService,
              private _authService: AuthService, 
              private _route: ActivatedRoute, 
              private _router: Router,
              private _location: Location,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer) { }

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
      this._posterService.deleteImage(poster.iconId).subscribe();
      this._posterService.deletePoster(poster).subscribe(res => {
        this._router.navigate(['/ownposters']);
      });
    }
  }

  getPoster(): void {
    const _id = this._route.snapshot.paramMap.get('id');
    this._posterService.getPoster(_id)
      .subscribe(poster => {
        this.poster = poster;
        this.previewUrl = this.poster.iconUrl;
      });
  }

  goBack(): void {
    this._location.back();
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DialogDeletionComponent, {data: {title: this.poster.jobTitle}});
    dialogRef.afterClosed().subscribe(result => {
      if ( result === "delete" ) {
        this.deletePoster(this.poster);
      } 
    });
  }

  // openDialog() {
  //   let dialogRef = this.dialog.open(DialogDeletionComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
    
  // }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) != null) {
      const reader = new FileReader();   
      reader.readAsDataURL(this.selectedFile); 
      reader.onload = (_event) => { 
        const preview = reader.result as string;
        this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(preview);
      }
    } else {
      this.previewUrl = "";
    }
  }

  updatePoster(): void {
    if (this.checkUserId()) {
      if (this.previewUrl != this.poster.iconUrl) {
        this.updatePosterWithImage();
      } else {
          this._posterService.updatePoster(this.poster._id, this.poster)
            .subscribe(() => this.goBack());
        }
    }
  }

  //uploadImage to cloudinary and stored url into database if previewUrl is renewed when submitted
  updatePosterWithImage() {
    const previousId = this.poster.iconId;
    this._posterService.uploadImage(this.selectedFile, this.poster)
      .subscribe(res => {
        if (this.poster.iconUrl != null) {
          this._posterService.deleteImage(previousId)
            .subscribe();
        } 
        this.poster.iconUrl = res.imgUrl;
        this.poster.iconId = res._id;
        this._posterService.updatePoster(this.poster._id, this.poster)
          .subscribe(() => this.goBack());  
      });
  }
}
