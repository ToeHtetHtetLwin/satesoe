import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChawtayComponent } from './chawtay.component';

describe('ChawtayComponent', () => {
  let component: ChawtayComponent;
  let fixture: ComponentFixture<ChawtayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChawtayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChawtayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
