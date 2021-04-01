import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketBallFieldsComponent } from './basket-ball-fields.component';

describe('BasketBallFieldsComponent', () => {
  let component: BasketBallFieldsComponent;
  let fixture: ComponentFixture<BasketBallFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketBallFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketBallFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
