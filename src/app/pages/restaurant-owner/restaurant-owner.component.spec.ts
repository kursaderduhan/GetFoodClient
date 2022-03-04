import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOwnerComponent } from './restaurant-owner.component';

describe('RestaurantOwnerComponent', () => {
  let component: RestaurantOwnerComponent;
  let fixture: ComponentFixture<RestaurantOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
