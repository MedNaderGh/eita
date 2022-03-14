import { AdminService } from './../../services/admin.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminComponent } from './admin.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      /* providers: [
        {provide:AdminService,useClass: adminservicestub}
      ], */
      declarations: [ AdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class adminservicestub {
}
