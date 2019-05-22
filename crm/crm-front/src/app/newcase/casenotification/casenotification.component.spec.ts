import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasenotificationComponent } from './casenotification.component';

describe('CasenotificationComponent', () => {
  let component: CasenotificationComponent;
  let fixture: ComponentFixture<CasenotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasenotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasenotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
