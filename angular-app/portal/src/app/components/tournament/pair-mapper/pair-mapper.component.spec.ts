import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairMapperComponent } from './pair-mapper.component';

describe('PairMapperComponent', () => {
  let component: PairMapperComponent;
  let fixture: ComponentFixture<PairMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
