import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App Components
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ReportsListComponent } from './features/reports/reports-list/reports-list.component';

// Note: This module is kept minimal as most components use standalone architecture
@NgModule({
  declarations: [
    ReportsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  // Note: Bootstrap is handled in main.ts using bootstrapApplication() since AppComponent is standalone
})
export class AppModule { }
