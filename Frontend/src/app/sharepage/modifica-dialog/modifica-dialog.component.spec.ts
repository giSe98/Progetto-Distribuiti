import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaDialogComponent } from './modifica-dialog.component';

describe('ModificaDialogComponent', () => {
  let component: ModificaDialogComponent;
  let fixture: ComponentFixture<ModificaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
