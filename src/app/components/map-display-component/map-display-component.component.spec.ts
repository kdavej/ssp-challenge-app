import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDisplayComponentComponent } from './map-display-component.component';

describe('MapDisplayComponentComponent', () => {
  let component: MapDisplayComponentComponent;
  let fixture: ComponentFixture<MapDisplayComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDisplayComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
