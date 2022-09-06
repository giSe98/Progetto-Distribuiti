import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffertaListComponent } from './offerta-list.component';

describe('OffertaListComponent', () => {
  let component: OffertaListComponent;
  let fixture: ComponentFixture<OffertaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffertaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffertaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
