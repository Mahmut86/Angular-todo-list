import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneItemComponent } from './one-item.component';

describe('NewItemComponent', () => {
  let component: OneItemComponent;
  let fixture: ComponentFixture<OneItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
