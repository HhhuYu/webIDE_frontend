import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExploreComponent } from './file-explore.component';

describe('FileExploreComponent', () => {
  let component: FileExploreComponent;
  let fixture: ComponentFixture<FileExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExploreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
