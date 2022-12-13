import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'Shared/shared.module';
import { TestCheckboxComponent } from './testCheckbox/testCheckbox.component';
import { TestSelectComponent } from './testSelect/testSelect.component';
import { TestFormComponent } from './testForm.component';
import { TestInputComponent } from './testInput/testInput.component';
import { TestNumberComponent } from './testNumber/testNumber.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    TestFormComponent,
    TestCheckboxComponent,
    TestSelectComponent,
    TestInputComponent,
    TestNumberComponent,
  ],
  imports: [CommonModule, SharedModule, NgxMaskModule.forChild()],
  exports: [TestFormComponent],
})
export class TestFormModule {}
