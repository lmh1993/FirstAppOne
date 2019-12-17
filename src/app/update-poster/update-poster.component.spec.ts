import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePosterComponent } from './update-poster.component';

describe('UpdatePosterComponent', () => {
  let component: UpdatePosterComponent;
  let fixture: ComponentFixture<UpdatePosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
