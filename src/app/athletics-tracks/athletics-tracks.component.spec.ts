import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleticsTracksComponent } from './athletics-tracks.component';

describe('AthleticsTracksComponent', () => {
  let component: AthleticsTracksComponent;
  let fixture: ComponentFixture<AthleticsTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleticsTracksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleticsTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
