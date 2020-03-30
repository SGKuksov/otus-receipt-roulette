import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieptPageComponent } from './reciept-page.component';

describe('RecieptPageComponent', () => {
  let component: RecieptPageComponent;
  let fixture: ComponentFixture<RecieptPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieptPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
