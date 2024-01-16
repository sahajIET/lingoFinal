import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTileComponent } from './blog-tile.component';

describe('BlogTileComponent', () => {
  let component: BlogTileComponent;
  let fixture: ComponentFixture<BlogTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogTileComponent]
    });
    fixture = TestBed.createComponent(BlogTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
