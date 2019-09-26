import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloModelPage } from './articulo-model.page';

describe('ArticuloModelPage', () => {
  let component: ArticuloModelPage;
  let fixture: ComponentFixture<ArticuloModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
