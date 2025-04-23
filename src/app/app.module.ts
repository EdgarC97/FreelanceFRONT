import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent // The root component of the application
  ],
  imports: [
    BrowserModule, // Essential browser module
    BrowserAnimationsModule, // For animations support
    HttpClientModule, // For making HTTP requests
    AppRoutingModule, // Main routing configuration
    CoreModule, // Core functionality module
    SharedModule // Shared components, directives, and pipes
  ],
  providers: [
    // Register the token interceptor for all HTTP requests
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent] // The component that bootstraps the application
})
export class AppModule {}