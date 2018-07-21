import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultParserComponent } from './result-parser.component';

describe('ResultParserComponent', () => {
  let component: ResultParserComponent;
  let fixture: ComponentFixture<ResultParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
