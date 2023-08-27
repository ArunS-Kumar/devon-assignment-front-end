import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { ServerInformationComponent } from './components/server-information/server-information.component';

const routes: Routes = [
  { path: '', component: ServerInformationComponent },
  { path: 'comparison', component: ComparisonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
