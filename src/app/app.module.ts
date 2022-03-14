import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, CanActivate } from '@angular/router';
import { AdminService } from "../services/admin.service";
import { ConsultantService } from "../services/consultant.service";
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { ConsultantComponent } from './consultant/consultant.component';
import {MatButtonModule} from '@angular/material/button';
import { AuthGuard } from 'src/_guards/auth.guard';
import { EmployesComponent } from './employes/employes.component';
import { StationsComponent } from './stations/stations.component';
import { ModalModule } from './_modal';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    ConsultantComponent,
    EmployesComponent,
    StationsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot([ {
      path: 'admin',
      component: AdminComponent,
      children: [
        {
          path : 'employes',
          component: EmployesComponent,
          },
          {
            path : 'stations',
            component: StationsComponent,
        },
      ]
    },
    {
      path: '',
      component: LoginComponent
    },
    {
      path: 'consultant',
      component: ConsultantComponent
    }
  ], { relativeLinkResolution: 'legacy' })
  ],
  providers: [AdminService,
              ConsultantService 
                       ],
  bootstrap: [AppComponent]
})
export class AppModule { }
