import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTableComponent } from './ad-table.component';

describe('AdTableComponent', () => {
  let component: AdTableComponent;
  let fixture: ComponentFixture<AdTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
