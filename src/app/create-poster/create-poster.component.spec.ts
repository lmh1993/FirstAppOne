import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePosterComponent } from './create-poster.component';

describe('CreatePosterComponent', () => {
  let component: CreatePosterComponent;
  let fixture: ComponentFixture<CreatePosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
