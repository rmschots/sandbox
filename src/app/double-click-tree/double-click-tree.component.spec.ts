import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleClickTreeComponent } from './double-click-tree.component';

describe('DoubleClickTreeComponent', () => {
  let component: DoubleClickTreeComponent;
  let fixture: ComponentFixture<DoubleClickTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleClickTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleClickTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
