import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PosterService } from '../poster.service';
import { Router } from '@angular/router';
import { Poster } from '../poster';

@Component({
  selector: 'app-create-poster',
  templateUrl: './create-poster.component.html',
  styleUrls: ['./create-poster.component.css']
})
export class CreatePosterComponent implements OnInit {
  submitted=false;
  poster = new Poster;
  // poster = {
  //   title: "",
  //   description: "",
  //   token: ""
  // };

  constructor(private _authService: AuthService, private _posterService: PosterService,
    private _router: Router) { }

  ngOnInit() {
  }

  createPoster() {
    const userId = this._authService.getUserId();
    this._authService.checkUserId(userId)
      .subscribe(
        res => {
          console.log(res);
          if (res.exist === true) {
            if (this.poster.title.length > 0 && this.poster.description.length > 0) {
              this.poster.userId = userId;
              this.finalizeCreation();
            }
          } else {
            this._router.navigate(['/login']);
          }
        },
        err => {
          console.log(err);
        }
      )  
  }

  finalizeCreation() {
    this._posterService.createPoster(this.poster)
    .subscribe(
      res => {
        this._router.navigate(['/ownposters']);
      }, 
      err => console.log(err)
    )
  }
}
