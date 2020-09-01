import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsHomeComponent } from './albums-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

describe('AlbumsHomeComponent', () => {
  let component: AlbumsHomeComponent;
  let fixture: ComponentFixture<AlbumsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumsHomeComponent],
      imports: [RouterTestingModule, NgProgressModule, NgProgressHttpModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
