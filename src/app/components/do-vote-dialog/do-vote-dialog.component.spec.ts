import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoVoteDialogComponent } from './do-vote-dialog.component';

describe('DoVoteDialogComponent', () => {
  let component: DoVoteDialogComponent;
  let fixture: ComponentFixture<DoVoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoVoteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoVoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
