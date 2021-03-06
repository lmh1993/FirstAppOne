import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnPostersComponent } from './own-posters.component';

describe('OwnPostersComponent', () => {
  let component: OwnPostersComponent;
  let fixture: ComponentFixture<OwnPostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnPostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnPostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
