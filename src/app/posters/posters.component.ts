import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { PosterService } from '../poster.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.css']
})
export class PostersComponent implements OnInit {

  posters = [];
  ownPosters = [];
  constructor(@Inject(LOCALE_ID) public locale: string, 
              private _posterService: PosterService, 
              private _route: ActivatedRoute) { }

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

}
