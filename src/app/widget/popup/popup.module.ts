import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/common';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PopupManager } from './popup.manager';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    PopupManager
  ]
})
export class PopupModule { }

