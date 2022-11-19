import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrareCentreComponent } from './filtrare-centre.component';

describe('FiltrareCentreComponent', () => {
  let component: FiltrareCentreComponent;
  let fixture: ComponentFixture<FiltrareCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrareCentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrareCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
