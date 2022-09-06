import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffertaDetailsComponent } from './offerta-details.component';

describe('OffertaDetailsComponent', () => {
  let component: OffertaDetailsComponent;
  let fixture: ComponentFixture<OffertaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffertaDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffertaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
