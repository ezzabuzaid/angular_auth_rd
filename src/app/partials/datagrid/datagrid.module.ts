import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/common';
import { DatagridComponent } from './datagrid.component';

@NgModule({
  declarations: [DatagridComponent],
  exports: [DatagridComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class DatagridModule { }
