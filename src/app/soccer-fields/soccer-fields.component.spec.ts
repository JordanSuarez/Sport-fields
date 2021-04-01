import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerFieldsComponent } from './soccer-fields.component';

describe('SoccerFieldsComponent', () => {
  let component: SoccerFieldsComponent;
  let fixture: ComponentFixture<SoccerFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoccerFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
