import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSearchModalComponent } from './location-search-modal.component';

describe('LocationSearchModalComponent', () => {
  let component: LocationSearchModalComponent;
  let fixture: ComponentFixture<LocationSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationSearchModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
