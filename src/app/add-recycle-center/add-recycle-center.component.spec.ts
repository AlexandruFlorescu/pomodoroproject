import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecycleCenterComponent } from './add-recycle-center.component';

describe('AddRecycleCenterComponent', () => {
  let component: AddRecycleCenterComponent;
  let fixture: ComponentFixture<AddRecycleCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecycleCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecycleCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
