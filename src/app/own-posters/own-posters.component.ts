import { Component, OnInit } from '@angular/core';
import { PosterService } from '../poster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-own-posters',
  templateUrl: './own-posters.component.html',
  styleUrls: ['./own-posters.component.css']
})
export class OwnPostersComponent implements OnInit {
  ownPosters = [];
  finishInit = false;
  iconUrl = "https://res.cloudinary.com/di8upirgz/image/upload/v1576801740/smallposter/logo_here_xvpclg.png";

  constructor(private _posterService: PosterService,
              private _authService: AuthService, 
              private _router: Router) { }

  ngOnInit() {
    const userId = this._authService.getUserId()
    this._posterService.getOwnPosters(userId)
      .subscribe(
        res => {
          this.ownPosters = res;
          this.finishInit = true;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
}
