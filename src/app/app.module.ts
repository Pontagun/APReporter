import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout'
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { WikiComponent } from './wiki/wiki.component';

import { HttpClientModule } from '@angular/common/http';
import { WidgetService } from './widget.service';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { MatTableModule } from '@angular/material/table'  
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NewsComponent,
    SideNavComponent,
    WikiComponent,
    ContactComponent,
    AboutComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHO67EXahchDlPYrBWArwuQhlLfsFZHM0'
    }),
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'news', component: NewsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'wiki', component: WikiComponent },
      { path: 'about', component: AboutComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'contact', component: ContactComponent },
      // { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
