import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerRequestListComponent } from './engineer-request-list.component';

describe('EngineerRequestListComponent', () => {
  let component: EngineerRequestListComponent;
  let fixture: ComponentFixture<EngineerRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineerRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
