import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReclamationListComponent
  }
];

@NgModule({
  declarations: [
    ReclamationListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ReclamationsModule { }
