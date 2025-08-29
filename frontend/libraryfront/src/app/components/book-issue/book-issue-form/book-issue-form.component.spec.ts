import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIssueFormComponent } from './book-issue-form.component';

describe('BookIssueFormComponent', () => {
  let component: BookIssueFormComponent;
  let fixture: ComponentFixture<BookIssueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookIssueFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
