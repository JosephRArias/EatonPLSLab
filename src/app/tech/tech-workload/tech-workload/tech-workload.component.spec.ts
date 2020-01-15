import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechWorkloadComponent } from './tech-workload.component';

describe('TechWorkloadComponent', () => {
  let component: TechWorkloadComponent;
  let fixture: ComponentFixture<TechWorkloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechWorkloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
