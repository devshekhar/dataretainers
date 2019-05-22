import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentmainpageComponent } from './agentmainpage.component';

describe('AgentmainpageComponent', () => {
  let component: AgentmainpageComponent;
  let fixture: ComponentFixture<AgentmainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentmainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentmainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
