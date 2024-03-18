import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoPlayerComponent } from './dialog-info-player.component';

describe('DialogInfoPlayerComponent', () => {
  let component: DialogInfoPlayerComponent;
  let fixture: ComponentFixture<DialogInfoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInfoPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogInfoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
