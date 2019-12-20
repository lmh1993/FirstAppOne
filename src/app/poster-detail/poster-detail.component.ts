import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { PosterService } from '../poster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Poster } from '../poster';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-poster-detail',
  templateUrl: './poster-detail.component.html',
  styleUrls: ['./poster-detail.component.css']
})
export class PosterDetailComponent implements OnDestroy, OnInit {
  _id;
  poster = new Poster(); 
  submitted=false;
  private ngUnsubscribe = new Subject();

  constructor(@Inject(MAT_DIALOG_DATA)
              private _authService: AuthService, 
              private _posterService: PosterService,
              private _router: Router,
              private _route: ActivatedRoute, 
              private _location: Location) { }

  ngOnInit() {
  }

  checkUserId() {
    if (this.poster.userId === this._authService.getUserId()) {
      return true;
    } else {
      return false;
    }
  }

//use takeUntil method to prevent memory leak.
  getPoster(_id): void {
    this._posterService.getPoster(_id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(poster => {
        console.log(poster);
        this.poster = poster;
      })
  }

  goBack(): void {
    this._location.back();
  }
  
  ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }
}
