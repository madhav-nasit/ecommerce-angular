import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRowComponent } from './detail-row.component';

describe('DetailRowComponent', () => {
  let component: DetailRowComponent;
  let fixture: ComponentFixture<DetailRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
