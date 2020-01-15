import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechRequestListComponent } from './tech-request-list.component';

describe('TechRequestListComponent', () => {
  let component: TechRequestListComponent;
  let fixture: ComponentFixture<TechRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
