import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogReportComponent } from './blog-report.component';

describe('BlogReportComponent', () => {
  let component: BlogReportComponent;
  let fixture: ComponentFixture<BlogReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogReportComponent]
    });
    fixture = TestBed.createComponent(BlogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
