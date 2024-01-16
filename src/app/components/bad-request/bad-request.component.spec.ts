import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadRequestComponent } from './bad-request.component';

describe('BadRequestComponent', () => {
  let component: BadRequestComponent;
  let fixture: ComponentFixture<BadRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadRequestComponent]
    });
    fixture = TestBed.createComponent(BadRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
