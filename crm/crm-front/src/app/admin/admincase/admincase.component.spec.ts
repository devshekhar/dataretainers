import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincaseComponent } from './admincase.component';

describe('AdmincaseComponent', () => {
  let component: AdmincaseComponent;
  let fixture: ComponentFixture<AdmincaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
