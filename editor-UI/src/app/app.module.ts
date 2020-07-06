import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxHtmlEditorModule, DxCheckBoxModule , DxTextBoxModule ,
  DxValidationSummaryModule,
  DxValidationGroupModule, DxValidatorModule, DxDropDownButtonModule,
  DxToolbarModule, DxSelectBoxModule, DxButtonModule,
} from 'devextreme-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule , ReactiveFormsModule, DxValidatorModule, DxDropDownButtonModule,
    DxToolbarModule, HttpClientModule, DxSelectBoxModule,
    DxButtonModule, DxHtmlEditorModule, DxCheckBoxModule, DxTextBoxModule, DxValidationSummaryModule,
    DxValidationGroupModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
