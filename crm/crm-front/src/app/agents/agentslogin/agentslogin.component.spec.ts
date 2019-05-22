import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsloginComponent } from './agentslogin.component';

describe('AgentsloginComponent', () => {
  let component: AgentsloginComponent;
  let fixture: ComponentFixture<AgentsloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
