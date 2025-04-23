import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent // Declare the shared header component
  ],
  imports: [
    CommonModule, // Angular common directives and pipes
    RouterModule, // For router links in shared components
    ReactiveFormsModule // For reactive forms in shared components
  ],
  exports: [
    // Export modules that should be available to importing modules
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // Export components that should be available to importing modules
    HeaderComponent
  ]
})
export class SharedModule {}