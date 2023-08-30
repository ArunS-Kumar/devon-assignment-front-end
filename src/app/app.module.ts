import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { ServerInformationComponent } from './components/server-information/server-information.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { CompareState } from './shared/store/compare.state';
import { compareReducer } from './shared/store/compare.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServerInformationComponent,
    FiltersComponent,
    ComparisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    NgFor,
    HttpClientModule,
    StoreModule.forRoot<{ compare: CompareState }>({ compare: compareReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
